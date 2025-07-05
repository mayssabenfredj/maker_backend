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
import { Transform } from 'class-transformer';

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
    description: 'URL of the workshop cover image',
    example: '/uploads/workshops/workshop-cover.jpg',
    required: false,
  })
  coverImagePath?: string;

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
  participants?: string[];

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

export class CreateWorkshopForm {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: true })
  startDate: string;

  @ApiProperty({ required: true })
  endDate: string;

  @ApiProperty({ required: true })
  location: string;

  @ApiProperty({ required: false })
  instructor?: string;

  @ApiProperty({ required: false })
  maxParticipants?: number;

  @ApiProperty({ required: false })
  price?: number;

  @ApiProperty({
    required: false,
    type: [String],
    example: [],
  })
  participants?: string[];

  @ApiProperty({
    required: false,
    type: [String],
    example: [],
  })
  suggestedProducts?: string[];

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Workshop cover image file',
  })
  image?: any;
}

export class UpdateWorkshopForm {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  startDate?: string;

  @ApiProperty({ required: false })
  endDate?: string;

  @ApiProperty({ required: false })
  location?: string;

  @ApiProperty({ required: false })
  instructor?: string;

  @ApiProperty({ required: false })
  maxParticipants?: number;

  @ApiProperty({ required: false })
  price?: number;

  @ApiProperty({
    required: false,
    type: [String],
    example: [],
  })
  participants?: string[];

  @ApiProperty({
    required: false,
    type: [String],
    example: [],
  })
  suggestedProducts?: string[];

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Workshop cover image file',
  })
  image?: any;
}

// Helper function for array transformation
const transformArray = ({ value }) => {
  if (value === undefined || value === null) return undefined;

  // Handle empty arrays
  if (Array.isArray(value) && value.length === 0) return [];

  // Handle empty strings
  if (typeof value === 'string' && value.trim() === '') return [];

  // Handle comma-separated strings
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((id) => id.trim())
      .filter((id) => id !== '');
  }

  // Handle arrays - clean each element
  if (Array.isArray(value)) {
    return value.map((id) => String(id).trim()).filter((id) => id !== '');
  }

  return value;
};

export class CreateWorkshopDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsOptional()
  instructor?: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  maxParticipants?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  price?: number;

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  @Transform(transformArray)
  participants?: string[];

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  @Transform(transformArray)
  suggestedProducts?: string[];

  @IsString()
  @IsOptional()
  coverImagePath?: string;
}

export class UpdateWorkshopDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  instructor?: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  maxParticipants?: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  price?: number;

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  @Transform(transformArray)
  participants?: string[];

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  @Transform(transformArray)
  suggestedProducts?: string[];

  @IsString()
  @IsOptional()
  coverImagePath?: string;
}
