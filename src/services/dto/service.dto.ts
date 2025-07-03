import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
  IsMongoId,
  IsBoolean,
  IsUrl,
  ArrayMinSize,
  ValidateIf,
} from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    description: 'Name of the service',
    example: 'Embedded System Consultation',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Detailed service description',
    example: 'Professional consultation for embedded systems design',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Array of category IDs',
    example: ['64c9e4e5a88f3f001f7d8a9a', '64c9e4e5a88f3f001f7d8a9b'],
    type: [String],
    required: true,
  })
  @IsArray()
  @IsMongoId({ each: true })
  @ArrayMinSize(1, { message: 'At least one category must be specified' })
  categories: string[];

  @ApiProperty({
    description: 'Service price in USD',
    example: 199.99,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Estimated service duration',
    example: '2 weeks',
    required: false,
  })
  @IsString()
  @IsOptional()
  duration?: string;

  @ApiProperty({
    description: 'Service provider information',
    example: 'Embedded Systems Lab',
    required: false,
  })
  @IsString()
  @IsOptional()
  provider?: string;

  @ApiProperty({
    description: 'Service image URL',
    example: 'https://example.com/service-image.jpg',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    description: 'Whether the service is active',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateServiceDto {
  @ApiProperty({
    description: 'Name of the service',
    example: 'Advanced Embedded System Consultation',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Detailed service description',
    example: 'Updated professional consultation for embedded systems',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Array of category IDs',
    example: ['64c9e4e5a88f3f001f7d8a9a', '64c9e4e5a88f3f001f7d8a9c'],
    type: [String],
    required: false,
  })
  @ValidateIf((o) => o.categories !== undefined)
  @IsArray()
  @IsMongoId({ each: true })
  @ArrayMinSize(1, { message: 'Cannot update to empty categories array' })
  categories?: string[];

  @ApiProperty({
    description: 'Service price in USD',
    example: 249.99,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Estimated service duration',
    example: '3 weeks',
    required: false,
  })
  @IsString()
  @IsOptional()
  duration?: string;

  @ApiProperty({
    description: 'Service provider information',
    example: 'Embedded Systems Lab (Premium)',
    required: false,
  })
  @IsString()
  @IsOptional()
  provider?: string;

  @ApiProperty({
    description: 'Service image URL',
    example: 'https://example.com/updated-service-image.jpg',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    description: 'Whether the service is active',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class ServiceResponseDto {
  @ApiProperty({
    description: 'Service ID',
    example: '64c9e4e5a88f3f001f7d8a9d',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the service',
    example: 'Embedded System Consultation',
  })
  name: string;

  @ApiProperty({
    description: 'Detailed service description',
    example: 'Professional consultation for embedded systems design',
  })
  description: string;

  @ApiProperty({
    description: 'Array of category details',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '64c9e4e5a88f3f001f7d8a9a' },
        name: { type: 'string', example: 'Consultation' },
      },
    },
  })
  categories: Array<{ id: string; name: string }>;

  @ApiProperty({
    description: 'Service price in USD',
    example: 199.99,
  })
  price: number;

  @ApiProperty({
    description: 'Estimated service duration',
    example: '2 weeks',
  })
  duration: string;

  @ApiProperty({
    description: 'Service provider information',
    example: 'Embedded Systems Lab',
  })
  provider: string;

  @ApiProperty({
    description: 'Service image URL',
    example: 'https://example.com/service-image.jpg',
  })
  imageUrl: string;

  @ApiProperty({
    description: 'Whether the service is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-08-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-08-05T00:00:00.000Z',
  })
  updatedAt: Date;
}

export class AddCategoriesDto {
  @ApiProperty({
    description: 'Array of category IDs to add',
    example: ['64c9e4e5a88f3f001f7d8a9a', '64c9e4e5a88f3f001f7d8a9b'],
    type: [String],
    required: true,
  })
  @IsArray()
  @IsMongoId({ each: true })
  @ArrayMinSize(1)
  categories: string[];
}

export class UpdateStatusDto {
  @ApiProperty({
    description: 'New active status',
    example: true,
    required: true,
  })
  @IsBoolean()
  isActive: boolean;
}
