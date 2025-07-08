import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class HeroButton {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  action: string;
}

@Schema({ timestamps: true })
export class HeroSection extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop([String])
  images?: string[];

  @Prop({ type: [Object], default: [] })
  buttons?: HeroButton[];
}

export const HeroSectionSchema = SchemaFactory.createForClass(HeroSection);
