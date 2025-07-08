import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Blog extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  cover: string;

  @Prop([String])
  images?: string[];

  @Prop()
  video?: string;

  @Prop()
  description?: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
