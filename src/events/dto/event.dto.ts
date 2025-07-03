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

export class CreateEventDto {
  @ApiProperty({
    description: 'Name of the event',
    example: 'Tech Conference 2023',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the event',
    example: 'Annual technology conference featuring top industry speakers',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Start date of the event in ISO format',
    example: '2023-11-15T09:00:00Z',
    required: true,
  })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    description: 'End date of the event in ISO format',
    example: '2023-11-17T18:00:00Z',
    required: true,
  })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({
    description: 'Location of the event',
    example: 'Convention Center, New York',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: 'Maximum number of participants',
    example: 500,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  maxParticipants?: number;

  @ApiProperty({
    description: 'Ticket price in USD',
    example: 99.99,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Array of participant IDs',
    example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012'],
    required: false,
    type: [String],
  })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  participants?: string[];
}

export class UpdateEventDto {
  @ApiProperty({
    description: 'Name of the event',
    example: 'Tech Conference 2023 Updated',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Description of the event',
    example: 'Updated description for the tech conference',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Start date of the event in ISO format',
    example: '2023-11-16T09:00:00Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({
    description: 'End date of the event in ISO format',
    example: '2023-11-18T18:00:00Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({
    description: 'Location of the event',
    example: 'Updated Convention Center, New York',
    required: false,
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({
    description: 'Maximum number of participants',
    example: 600,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  maxParticipants?: number;

  @ApiProperty({
    description: 'Ticket price in USD',
    example: 129.99,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Array of participant IDs',
    example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439013'],
    required: false,
    type: [String],
  })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  participants?: string[];
}

export class EventResponseDto {
  @ApiProperty({
    description: 'Event ID',
    example: '507f1f77bcf86cd799439011',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the event',
    example: 'Tech Conference 2023',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the event',
    example: 'Annual technology conference',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Start date of the event',
    example: '2023-11-15T09:00:00Z',
  })
  startDate: Date;

  @ApiProperty({
    description: 'End date of the event',
    example: '2023-11-17T18:00:00Z',
  })
  endDate: Date;

  @ApiProperty({
    description: 'Location of the event',
    example: 'Convention Center, New York',
  })
  location: string;

  @ApiProperty({
    description: 'Maximum number of participants',
    example: 500,
    required: false,
  })
  maxParticipants?: number;

  @ApiProperty({
    description: 'Ticket price in USD',
    example: 99.99,
    required: false,
  })
  price?: number;

  @ApiProperty({
    description: 'Array of participant IDs',
    example: ['507f1f77bcf86cd799439011'],
    type: [String],
  })
  participants: string[];

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-10-01T12:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-10-05T14:30:00Z',
  })
  updatedAt: Date;
}
