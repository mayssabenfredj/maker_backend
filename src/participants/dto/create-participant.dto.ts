import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
  IsDateString,
  IsMongoId,
  ValidateIf,
} from 'class-validator';

export class CreateParticipantDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  country?: string;

  // Participant can belong to either an event OR a workshop, not both
  @IsMongoId()
  @IsOptional()
  @ValidateIf((o) => !o.workshop) // Only validate if workshop is not provided
  event?: string;

  @IsMongoId()
  @IsOptional()
  @ValidateIf((o) => !o.event) // Only validate if event is not provided
  workshop?: string;
}