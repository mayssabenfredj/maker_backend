import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsMongoId,
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
  price: number;

  @IsMongoId()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  image?: string;
}
