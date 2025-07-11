import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  IsMongoId,
} from 'class-validator';

@Schema({ timestamps: true })
class ModuleItem {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  items: string[];
}

class Instructor {
  @IsOptional()
  @IsString()
  photoUrl?: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  experienceYears: number;

  @IsOptional()
  @IsNumber()
  studentsCount: number;
}
export class Event {
  @Prop({ type: [{ title: String, items: [String] }] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ModuleItem)
  modules?: ModuleItem[];

  @Prop({
    type: {
      photoUrl: String,
      name: String,
      title: String,
      experienceYears: Number,
      studentsCount: Number,
    },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => Instructor)
  instructor?: Instructor;

  @Prop({ required: true, enum: ['workshop', 'bootcamp', 'event', 'course'] })
  @IsString()
  type: 'workshop' | 'bootcamp' | 'event' | 'course';

  @Prop({ required: true })
  @IsString()
  name: string;

  @Prop()
  @IsOptional()
  @IsNumber()
  price?: number;

  @Prop()
  @IsOptional()
  @IsNumber()
  reduction?: number;

  @Prop()
  @IsOptional()
  @IsString()
  duration?: string;

  @Prop()
  @IsOptional()
  startDate?: Date;

  @Prop({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  required?: string[];

  @Prop({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  includedInEvent?: string[];

  @Prop({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  objectives?: string[];

  @Prop({ enum: ['online', 'in_person', 'hybrid'], default: 'online' })
  @IsOptional()
  @IsString()
  location?: 'online' | 'in_person' | 'hybrid';

  @Prop({ default: false })
  @IsOptional()
  @IsBoolean()
  certification?: boolean;

  @Prop({ type: [Types.ObjectId] })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  products?: Types.ObjectId[];

  @Prop()
  @IsOptional()
  @IsString()
  address?: string;

  @Prop({ required: true })
  @IsString()
  coverImage: string;

  @Prop({ type: [Types.ObjectId], ref: 'Participant', default: [] })
  @IsArray()
  @IsMongoId({ each: true })
  participants?: Types.ObjectId[];
}

export type EventDocument = Event & Document;
export const EventSchema = SchemaFactory.createForClass(Event);
