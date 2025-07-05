import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
  IsDateString,
  IsMongoId,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateParticipantDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  country?: string;

  // Participant can belong to either an event OR a workshop, not both
  @ApiPropertyOptional({ type: String, description: 'Event ID' })
  @IsMongoId()
  @IsOptional()
  @ValidateIf((o) => !o.workshop) // Only validate if workshop is not provided
  event?: string;

  @ApiPropertyOptional({ type: String, description: 'Workshop ID' })
  @IsMongoId()
  @IsOptional()
  @ValidateIf((o) => !o.event) // Only validate if event is not provided
  workshop?: string;
}