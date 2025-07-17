import {
  Injectable,
  HttpException,
  HttpStatus,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import {
  CreateParticipantDto,
  RegisterForEventDto,
} from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Participant } from './entities/participant.entity';
import { Event } from '../events/entities/event.entity';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectModel(Participant.name) private participantModel: Model<Participant>,
    @InjectModel(Event.name) private eventModel: Model<Event>,
  ) {}

  /**
   * Returns an array of objects, each containing:
   *   - eventId
   *   - eventName
   *   - price (or other event fields)
   *   - event (full event document)
   *   - participants: Participant[]
   */
  async findAll() {
    try {
      const result = await this.participantModel.aggregate([
        {
          $match: {
            event: { $exists: true },
          },
        },
        {
          $addFields: {
            event: {
              $convert: { input: '$event', to: 'objectId', onError: null },
            },
          },
        },
        {
          $lookup: {
            from: 'events',
            localField: 'event',
            foreignField: '_id',
            as: 'event',
          },
        },
        { $unwind: '$event' },
        {
          $group: {
            _id: '$event._id',
            event: { $first: '$event' },
            participants: { $push: '$$ROOT' },
          },
        },
        {
          $project: {
            _id: 0,
            eventId: '$_id',
            eventName: '$event.name',
            price: '$event.price',
            event: '$event',
            participants: 1,
          },
        },
      ]);

      return {
        message: 'Participants grouped by event',
        data: result,
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

  async registerForEvent(dto: RegisterForEventDto) {
    try {
      const { eventId, ...participantData } = dto;

      const participant = await this.participantModel.create({
        ...participantData,
        event: eventId,
      });

      // push participant reference into Event.participants array (avoid duplicates)
      await this.eventModel.findByIdAndUpdate(
        eventId,
        { $addToSet: { participants: participant._id } },
        { new: true },
      );

      return participant;
    } catch (error) {
      if (error.code === 11000) {
        // MongoDB duplicate key error
        throw new ConflictException('Email already registered for this event');
      }
      throw error;
    }
  }
}
