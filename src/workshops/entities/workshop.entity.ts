import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Participant } from '../../participants/entities/participant.entity';
import { Product } from '../../products/entities/product.entity';

/**
 * Workshop Entity
 * Has many Participants (one-to-many relationship)
 * Has many-to-many relationship with Products (suggested products)
 */
@Schema()
export class Workshop extends Document {
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
  participants?: Participant[] | Types.ObjectId[];

  // Many-to-many relationship: Workshop has many suggested Products
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  suggestedProducts?: Product[] | Types.ObjectId[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const WorkshopSchema = SchemaFactory.createForClass(Workshop);