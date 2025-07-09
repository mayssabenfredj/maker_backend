import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  ArrayMaxSize,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

class HeroButtonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  action: string;
}

export class CreateHeroSectionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    }
    // Si c'est un tableau de strings JSON
    if (
      Array.isArray(value) &&
      value.length === 1 &&
      typeof value[0] === 'string'
    ) {
      try {
        return JSON.parse(value[0]);
      } catch {
        return [];
      }
    }
    return value;
  })
  @Type(() => HeroButtonDto)
  @IsOptional()
  buttons?: HeroButtonDto[];
}
