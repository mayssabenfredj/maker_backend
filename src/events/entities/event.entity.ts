import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Participant } from '../../participants/entities/participant.entity';

/**
 * Event Entity
 * Has many Participants (one-to-many relationship)
 */
@Schema()
export class Event extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  location: string;

  @Prop()
  maxParticipants?: number;

  @Prop()
  price?: number;

  // One-to-many relationship: Event has many Participants
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Participant' }] })
  participants?: Participant[] | Types.ObjectId[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);