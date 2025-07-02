import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Event } from '../../events/entities/event.entity';
import { Workshop } from '../../workshops/entities/workshop.entity';

/**
 * Participant Entity
 * Belongs to either an Event OR a Workshop (not both)
 * Uses optional references to maintain flexibility
 */
@Schema()
export class Participant extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop()
  dateOfBirth?: Date;

  @Prop()
  address?: string;

  @Prop()
  city?: string;

  @Prop()
  country?: string;

  // Optional reference to Event - participant can belong to an event
  @Prop({ type: Types.ObjectId, ref: 'Event', required: false })
  event?: Event | Types.ObjectId;

  // Optional reference to Workshop - participant can belong to a workshop
  @Prop({ type: Types.ObjectId, ref: 'Workshop', required: false })
  workshop?: Workshop | Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);

// Add validation to ensure participant belongs to either event OR workshop, not both
ParticipantSchema.pre('save', function(next) {
  if (this.event && this.workshop) {
    next(new Error('Participant cannot belong to both an event and a workshop'));
  } else if (!this.event && !this.workshop) {
    next(new Error('Participant must belong to either an event or a workshop'));
  } else {
    next();
  }
});