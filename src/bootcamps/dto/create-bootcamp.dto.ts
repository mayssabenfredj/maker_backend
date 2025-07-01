import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  IsMongoId,
  IsDateString,
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

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  participants?: string[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  products?: string[];
}
