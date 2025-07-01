import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateBootcampDto } from './dto/create-bootcamp.dto';
import { UpdateBootcampDto } from './dto/update-bootcamp.dto';
import { Bootcamp } from './entities/bootcamp.entity';

@Injectable()
export class BootcampsService {
  constructor(
    @InjectModel(Bootcamp.name) private bootcampModel: Model<Bootcamp>,
  ) {}

  async create(
    createBootcampDto: CreateBootcampDto,
  ): Promise<{ message: string; data: Bootcamp }> {
    try {
      const createdBootcamp = new this.bootcampModel(createBootcampDto);
      const savedBootcamp = await createdBootcamp.save();
      return {
        message: 'Bootcamp created successfully',
        data: savedBootcamp,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Failed to create bootcamp: ' + error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<{ message: string; data: Bootcamp[] }> {
    try {
      const bootcamps = await this.bootcampModel
        .find()
        .populate('category')
        .populate('participants')
        .populate('products')
        .exec();
      return {
        message: 'Bootcamps retrieved successfully',
        data: bootcamps,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to retrieve bootcamps: ' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<{ message: string; data: Bootcamp }> {
    if (!isValidObjectId(id)) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid bootcamp ID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const bootcamp = await this.bootcampModel
        .findById(id)
        .populate('category')
        .populate('participants')
        .populate('products')
        .exec();
      if (!bootcamp) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Bootcamp not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        message: 'Bootcamp retrieved successfully',
        data: bootcamp,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to retrieve bootcamp: ' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    updateBootcampDto: UpdateBootcampDto,
  ): Promise<{ message: string; data: Bootcamp }> {
    if (!isValidObjectId(id)) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid bootcamp ID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const updatedBootcamp = await this.bootcampModel
        .findByIdAndUpdate(id, updateBootcampDto, { new: true })
        .populate('category')
        .populate('participants')
        .populate('products')
        .exec();

      if (!updatedBootcamp) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Bootcamp not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        message: 'Bootcamp updated successfully',
        data: updatedBootcamp,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Failed to update bootcamp: ' + error.message,
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
          message: 'Invalid bootcamp ID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const deletedBootcamp = await this.bootcampModel
        .findByIdAndDelete(id)
        .exec();
      if (!deletedBootcamp) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Bootcamp not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        message: 'Bootcamp deleted successfully',
        data: null,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to delete bootcamp: ' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
