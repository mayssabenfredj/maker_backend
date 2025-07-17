import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Event } from '../../events/entities/event.entity';

/**
 * Participant Entity
 * A participant can join multiple events and workshops
 * But can only join each specific event/workshop once (enforced by email uniqueness per event/workshop)
 */
@Schema({ timestamps: true })
export class Participant extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone?: string;

  @Prop()
  dateOfBirth?: Date;

  @Prop()
  address?: string;

  @Prop()
  organizationName?: string;

  @Prop()
  city?: string;

  @Prop()
  country?: string;

  // Optional reference to Event - participant can belong to an event
  @Prop({ type: Types.ObjectId, ref: 'Event', required: false })
  event?: Event | Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);

// Ensure a participant email is unique within the same event
ParticipantSchema.index(
  { email: 1, event: 1 },
  {
    unique: true,
    partialFilterExpression: { event: { $exists: true } },
    name: 'unique_email_per_event',
  },
);
