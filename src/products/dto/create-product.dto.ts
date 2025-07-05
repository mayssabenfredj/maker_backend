import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsMongoId,
  IsArray,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  price: number;

  @IsMongoId()
  @IsNotEmpty()
  category: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  video?: string;
}
