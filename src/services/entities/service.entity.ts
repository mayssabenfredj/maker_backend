import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Service Entity - Simple CRUD model
 * No special relationships as per requirements
 */
@Schema()
export class Service extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  category?: string;

  @Prop()
  price?: number;

  @Prop()
  duration?: string;

  @Prop()
  provider?: string;

  @Prop({ default: true })
  isActive?: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);