import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Participant } from './entities/participant.entity';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectModel(Participant.name) private participantModel: Model<Participant>,
  ) {}

  async create(createParticipantDto: CreateParticipantDto): Promise<{ message: string; data: Participant }> {
    try {
      // Validate that participant belongs to either event OR workshop, not both
      if (createParticipantDto.event && createParticipantDto.workshop) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Participant cannot belong to both an event and a workshop',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!createParticipantDto.event && !createParticipantDto.workshop) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Participant must belong to either an event or a workshop',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const createdParticipant = new this.participantModel(createParticipantDto);
      const savedParticipant = await createdParticipant.save();
      return {
        message: 'Participant created successfully',
        data: savedParticipant,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Failed to create participant: ' + error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<{ message: string; data: Participant[] }> {
    try {
      const participants = await this.participantModel
        .find()
        .populate('event')
        .populate('workshop')
        .exec();
      return {
        message: 'Participants retrieved successfully',
        data: participants,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to retrieve participants: ' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<{ message: string; data: Participant }> {
    if (!isValidObjectId(id)) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid participant ID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const participant = await this.participantModel
        .findById(id)
        .populate('event')
        .populate('workshop')
        .exec();
      if (!participant) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Participant not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        message: 'Participant retrieved successfully',
        data: participant,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to retrieve participant: ' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateParticipantDto: UpdateParticipantDto): Promise<{ message: string; data: Participant }> {
    if (!isValidObjectId(id)) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid participant ID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const updatedParticipant = await this.participantModel
        .findByIdAndUpdate(id, updateParticipantDto, { new: true })
        .populate('event')
        .populate('workshop')
        .exec();

      if (!updatedParticipant) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Participant not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        message: 'Participant updated successfully',
        data: updatedParticipant,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Failed to update participant: ' + error.message,
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
          message: 'Invalid participant ID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const deletedParticipant = await this.participantModel.findByIdAndDelete(id).exec();
      if (!deletedParticipant) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Participant not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        message: 'Participant deleted successfully',
        data: null,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to delete participant: ' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}