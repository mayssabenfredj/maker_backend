import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  IsMongoId,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateBootcampDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsMongoId()
  @IsNotEmpty()
  category: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value.split(',').map((item) => item.trim());
      }
    }
    return value;
  })
  types: string[];

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsDateString()
  @IsNotEmpty()
  dateDebut: string;

  @IsDateString()
  @IsNotEmpty()
  dateFin: string;

  @IsString()
  @IsOptional()
  periode?: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  animator: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  price: number;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return value.split(',').map((item) => item.trim());
      }
    }
    return Array.isArray(value) ? value : [value];
  })
  participants?: string[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return value.split(',').map((item) => item.trim());
      }
    }
    return Array.isArray(value) ? value : [value];
  })
  products?: string[];
}
