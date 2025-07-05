import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateWorkshopDto, UpdateWorkshopDto } from './dto/workshop.dto';
import { Workshop, WorkshopDocument } from './entities/workshop.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class WorkshopsService {
  constructor(
    @InjectModel(Workshop.name) private workshopModel: Model<WorkshopDocument>,
  ) {}

  async create(
    createWorkshopDto: CreateWorkshopDto,
  ): Promise<{ message: string; data: WorkshopDocument }> {
    try {
      // Validate dates
      if (
        new Date(createWorkshopDto.startDate) >=
        new Date(createWorkshopDto.endDate)
      ) {
        throw new Error('End date must be after start date');
      }

      const createdWorkshop = new this.workshopModel(createWorkshopDto);
      const savedWorkshop = await createdWorkshop.save();

      return {
        message: 'Workshop created successfully',
        data: savedWorkshop,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Failed to create workshop: ' + error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<{ message: string; data: WorkshopDocument[] }> {
    try {
      const workshops = await this.workshopModel
        .find()
        .populate('participants')
        .populate('suggestedProducts')
        .sort({ startDate: 1 }) // Sort by start date ascending
        .exec();

      return {
        message: 'Workshops retrieved successfully',
        data: workshops,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to retrieve workshops: ' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(
    id: string,
  ): Promise<{ message: string; data: WorkshopDocument }> {
    if (!isValidObjectId(id)) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid workshop ID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const workshop = await this.workshopModel
        .findById(id)
        .populate('participants')
        .populate('suggestedProducts')
        .exec();

      if (!workshop) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Workshop not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        message: 'Workshop retrieved successfully',
        data: workshop,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to retrieve workshop: ' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    updateWorkshopDto: UpdateWorkshopDto,
  ): Promise<{ message: string; data: WorkshopDocument }> {
    if (!isValidObjectId(id)) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid workshop ID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      // Track old image for cleanup
      let oldImagePath: string | null = null;
      if (updateWorkshopDto.coverImagePath) {
        const existing = await this.workshopModel
          .findById(id)
          .select('coverImagePath')
          .exec();
        oldImagePath = existing?.coverImagePath || null;
      }

      // Check if dates are being updated
      if (updateWorkshopDto.startDate || updateWorkshopDto.endDate) {
        const existingWorkshop = await this.workshopModel.findById(id).exec();

        if (!existingWorkshop) {
          throw new HttpException(
            {
              statusCode: HttpStatus.NOT_FOUND,
              message: 'Workshop not found',
            },
            HttpStatus.NOT_FOUND,
          );
        }

        const startDate = updateWorkshopDto.startDate
          ? new Date(updateWorkshopDto.startDate)
          : existingWorkshop.startDate;

        const endDate = updateWorkshopDto.endDate
          ? new Date(updateWorkshopDto.endDate)
          : existingWorkshop.endDate;

        if (startDate >= endDate) {
          throw new Error('End date must be after start date');
        }
      }

      const updatedWorkshop = await this.workshopModel
        .findByIdAndUpdate(id, updateWorkshopDto, { new: true })
        .populate('participants')
        .populate('suggestedProducts')
        .exec();

      if (!updatedWorkshop) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Workshop not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      // Clean up old image if it was replaced
      if (oldImagePath && oldImagePath !== updatedWorkshop.coverImagePath) {
        this.deleteImageFile(oldImagePath);
      }

      return {
        message: 'Workshop updated successfully',
        data: updatedWorkshop,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Failed to update workshop: ' + error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string): Promise<{ message: string; data: null }> {
    if (!isValidObjectId(id)) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid workshop ID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      // Get workshop to access coverImagePath before deletion
      const workshop = await this.workshopModel.findById(id).exec();

      if (!workshop) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Workshop not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const imagePath = workshop.coverImagePath || null;
      const deletedWorkshop = await this.workshopModel
        .findByIdAndDelete(id)
        .exec();

      // Clean up associated image
      if (imagePath) {
        this.deleteImageFile(imagePath);
      }

      return {
        message: 'Workshop deleted successfully',
        data: null,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to delete workshop: ' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private deleteImageFile(imagePath: string): void {
    try {
      if (!imagePath) return;

      const fullPath = path.join(process.cwd(), imagePath);

      // Check if file exists before deleting
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    } catch (error) {
      console.error('Failed to delete image file:', imagePath, error);
      // Fail silently - don't throw error for file cleanup failures
    }
  }
}
