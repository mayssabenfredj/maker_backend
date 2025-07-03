import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsNumber,
  IsArray,
  IsUrl,
  IsBoolean,
  Min,
  Max,
  IsIn,
  IsMongoId,
} from 'class-validator';

const validStatuses = [
  'Planning',
  'In Development',
  'Prototyping',
  'Testing',
  'Completed',
  'Deployed',
];
const validPriorities = ['Low', 'Medium', 'High', 'Critical'];

export class CreateProjectDto {
  @ApiProperty({
    description: 'Name of the embedded systems project',
    example: 'Industrial IoT Monitoring System',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Short tagline for the project',
    example: 'Real-time monitoring for factory equipment',
    required: false,
  })
  @IsString()
  @IsOptional()
  tagline?: string;

  @ApiProperty({
    description: 'Detailed technical description',
    example:
      'STM32-based monitoring system with LoRaWAN connectivity for factory sensors',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Main project image URL',
    example: '/assets/projects/iot-monitoring-cover.jpg',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  coverImage: string;

  @ApiProperty({
    description: 'Project status',
    example: 'In Development',
    enum: validStatuses,
    required: false,
  })
  @IsString()
  @IsIn(validStatuses)
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'Main technologies used',
    example: ['STM32', 'FreeRTOS', 'LoRaWAN', 'Modbus'],
    type: [String],
    required: true,
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  technologies: string[];

  @ApiProperty({
    description: 'Array of category IDs',
    example: ['64c9e4e5a88f3f001f7d8a9a', '64c9e4e5a88f3f001f7d8a9b'],
    type: [String],
    required: true,
  })
  @IsArray()
  @IsMongoId({ each: true })
  categories: string[];

  @ApiProperty({
    description: 'Project start date (ISO format)',
    example: '2023-06-01',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({
    description: 'Project target completion date (ISO format)',
    example: '2023-12-15',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  targetDate?: string;

  @ApiProperty({
    description: 'Project team members',
    example: ['john.doe@factory.com', 'jane.smith@factory.com'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  team?: string[];

  @ApiProperty({
    description: 'Git repository URL',
    example: 'https://github.com/factory-lab/iot-monitoring',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  repository?: string;

  @ApiProperty({
    description: 'Project demonstration video URL',
    example: 'https://youtube.com/watch?v=embedded-demo',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  videoUrl?: string;

  @ApiProperty({
    description: 'Mark project as featured',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @ApiProperty({
    description: 'Project priority level',
    example: 'High',
    enum: validPriorities,
    required: false,
  })
  @IsString()
  @IsIn(validPriorities)
  @IsOptional()
  priority?: string;

  @ApiProperty({
    description: 'Project completion percentage (0-100)',
    example: 65,
    minimum: 0,
    maximum: 100,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  completion?: number;
}

export class UpdateProjectDto {
  @ApiProperty({
    description: 'Name of the embedded systems project',
    example: 'Industrial IoT Monitoring System v2',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Short tagline for the project',
    example: 'Enhanced real-time monitoring for factory equipment',
    required: false,
  })
  @IsString()
  @IsOptional()
  tagline?: string;

  @ApiProperty({
    description: 'Detailed technical description',
    example: 'Updated STM32-based system with additional sensor support',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Main project image URL',
    example: '/assets/projects/iot-monitoring-v2-cover.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  coverImage?: string;

  @ApiProperty({
    description: 'Project status',
    example: 'Testing',
    enum: validStatuses,
    required: false,
  })
  @IsString()
  @IsIn(validStatuses)
  @IsOptional()
  status?: string;

  @ApiProperty({
    description: 'Main technologies used',
    example: ['STM32', 'FreeRTOS', 'LoRaWAN', 'Modbus', 'CAN Bus'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  technologies?: string[];

  @ApiProperty({
    description: 'Project categories/tags',
    example: ['IoT', 'Industrial', 'Monitoring', 'Predictive Maintenance'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  categories?: string[];

  @ApiProperty({
    description: 'Project target completion date (ISO format)',
    example: '2024-01-15',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  targetDate?: string;

  @ApiProperty({
    description: 'Project team members',
    example: [
      'john.doe@factory.com',
      'jane.smith@factory.com',
      'new.engineer@factory.com',
    ],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  team?: string[];

  @ApiProperty({
    description: 'Git repository URL',
    example: 'https://github.com/factory-lab/iot-monitoring-v2',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  repository?: string;

  @ApiProperty({
    description: 'Project demonstration video URL',
    example: 'https://youtube.com/watch?v=embedded-demo-v2',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  videoUrl?: string;

  @ApiProperty({
    description: 'Mark project as featured',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @ApiProperty({
    description: 'Project priority level',
    example: 'Critical',
    enum: validPriorities,
    required: false,
  })
  @IsString()
  @IsIn(validPriorities)
  @IsOptional()
  priority?: string;

  @ApiProperty({
    description: 'Project completion percentage (0-100)',
    example: 80,
    minimum: 0,
    maximum: 100,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  completion?: number;
}
