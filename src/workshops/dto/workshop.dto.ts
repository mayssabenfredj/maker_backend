import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsNumber,
  IsArray,
  IsMongoId,
} from 'class-validator';

export class CreateWorkshopDto {
  @ApiProperty({
    description: 'Name of the workshop',
    example: 'Advanced Woodworking Techniques',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Detailed description of the workshop',
    example:
      'Learn advanced joinery and finishing techniques from master craftsmen',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Start date and time of the workshop in ISO format',
    example: '2023-12-05T09:00:00Z',
    required: true,
  })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    description: 'End date and time of the workshop in ISO format',
    example: '2023-12-05T17:00:00Z',
    required: true,
  })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({
    description: 'Physical location of the workshop',
    example: 'Craftsman Studio, 123 Artisan St, Portland, OR',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: 'Name of the workshop instructor',
    example: 'James Woodwright',
    required: false,
  })
  @IsString()
  @IsOptional()
  instructor?: string;

  @ApiProperty({
    description: 'Maximum number of participants allowed',
    example: 15,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  maxParticipants?: number;

  @ApiProperty({
    description: 'Price of the workshop in USD',
    example: 199.99,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Array of participant IDs registered for the workshop',
    example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012'],
    required: false,
    type: [String],
  })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  participants?: string[];

  @ApiProperty({
    description: 'Array of product IDs recommended for this workshop',
    example: ['507f1f77bcf86cd799439021', '507f1f77bcf86cd799439022'],
    required: false,
    type: [String],
  })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  suggestedProducts?: string[];
}

export class UpdateWorkshopDto {
  @ApiProperty({
    description: 'Name of the workshop',
    example: 'Advanced Woodworking Techniques - Master Class',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Detailed description of the workshop',
    example:
      'Learn advanced joinery, finishing techniques, and tool maintenance',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Start date and time of the workshop in ISO format',
    example: '2023-12-06T09:00:00Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({
    description: 'End date and time of the workshop in ISO format',
    example: '2023-12-06T17:00:00Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({
    description: 'Physical location of the workshop',
    example: 'Master Craftsman Studio, 123 Artisan St, Portland, OR',
    required: false,
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({
    description: 'Name of the workshop instructor',
    example: 'James Woodwright Jr.',
    required: false,
  })
  @IsString()
  @IsOptional()
  instructor?: string;

  @ApiProperty({
    description: 'Maximum number of participants allowed',
    example: 20,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  maxParticipants?: number;

  @ApiProperty({
    description: 'Price of the workshop in USD',
    example: 249.99,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Array of participant IDs registered for the workshop',
    example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439013'],
    required: false,
    type: [String],
  })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  participants?: string[];

  @ApiProperty({
    description: 'Array of product IDs recommended for this workshop',
    example: ['507f1f77bcf86cd799439021', '507f1f77bcf86cd799439023'],
    required: false,
    type: [String],
  })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  suggestedProducts?: string[];
}

export class WorkshopResponseDto {
  @ApiProperty({
    description: 'Workshop ID',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the workshop',
    example: 'Advanced Woodworking Techniques',
  })
  name: string;

  @ApiProperty({
    description: 'Detailed description of the workshop',
    example:
      'Learn advanced joinery and finishing techniques from master craftsmen',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Start date and time of the workshop',
    example: '2023-12-05T09:00:00Z',
  })
  startDate: Date;

  @ApiProperty({
    description: 'End date and time of the workshop',
    example: '2023-12-05T17:00:00Z',
  })
  endDate: Date;

  @ApiProperty({
    description: 'Physical location of the workshop',
    example: 'Craftsman Studio, 123 Artisan St, Portland, OR',
  })
  location: string;

  @ApiProperty({
    description: 'Name of the workshop instructor',
    example: 'James Woodwright',
    required: false,
  })
  instructor?: string;

  @ApiProperty({
    description: 'Maximum number of participants allowed',
    example: 15,
    required: false,
  })
  maxParticipants?: number;

  @ApiProperty({
    description: 'Price of the workshop in USD',
    example: 199.99,
    required: false,
  })
  price?: number;

  @ApiProperty({
    description: 'Array of participant IDs registered for the workshop',
    example: ['507f1f77bcf86cd799439011'],
    type: [String],
  })
  participants: string[];

  @ApiProperty({
    description: 'Array of product IDs recommended for this workshop',
    example: ['507f1f77bcf86cd799439021'],
    type: [String],
  })
  suggestedProducts: string[];

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-11-01T10:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-11-15T14:30:00Z',
  })
  updatedAt: Date;
}
