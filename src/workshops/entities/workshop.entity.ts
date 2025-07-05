import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Workshop {
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
  instructor?: string;

  @Prop()
  maxParticipants?: number;

  @Prop()
  price?: number;

  // One-to-many relationship: Workshop has many Participants
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Participant' }] })
  participants?: Types.ObjectId[];

  // Many-to-many relationship: Workshop has many suggested Products
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  suggestedProducts?: Types.ObjectId[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop()
  coverImagePath?: string; // Changed to match service
}

// Define the document type
export type WorkshopDocument = Workshop & Document;

export const WorkshopSchema = SchemaFactory.createForClass(Workshop);
