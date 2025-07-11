import { IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';

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

  @IsOptional()
  buttons?: string;
}
