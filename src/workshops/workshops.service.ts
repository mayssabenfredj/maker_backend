import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateWorkshopDto } from './dto/create-workshop.dto';
import { UpdateWorkshopDto } from './dto/update-workshop.dto';
import { Workshop } from './entities/workshop.entity';

@Injectable()
export class WorkshopsService {
  constructor(
    @InjectModel(Workshop.name) private workshopModel: Model<Workshop>,
  ) {}

  async create(createWorkshopDto: CreateWorkshopDto): Promise<{ message: string; data: Workshop }> {
    try {
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

  async findAll(): Promise<{ message: string; data: Workshop[] }> {
    try {
      const workshops = await this.workshopModel
        .find()
        .populate('participants')
        .populate('suggestedProducts')
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

  async findOne(id: string): Promise<{ message: string; data: Workshop }> {
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

  async update(id: string, updateWorkshopDto: UpdateWorkshopDto): Promise<{ message: string; data: Workshop }> {
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
      const deletedWorkshop = await this.workshopModel.findByIdAndDelete(id).exec();
      if (!deletedWorkshop) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Workshop not found',
          },
          HttpStatus.NOT_FOUND,
        );
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
}