import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Embedded Systems Project Entity for Factory Lab Website
 */
@Schema({ timestamps: true })
export class Project extends Document {
  @ApiProperty({
    description: 'Name of the embedded systems project',
    example: 'Smart Factory Monitoring System',
    required: true,
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'Short tagline for the project',
    example: 'Real-time IoT monitoring for industrial equipment',
  })
  @Prop()
  tagline?: string;

  @ApiProperty({
    description: 'Detailed technical description',
    example: 'ARM Cortex-M4 based monitoring system with LoRaWAN connectivity',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    description: 'Main project image URL',
    example: '/assets/projects/smart-factory-cover.jpg',
  })
  @Prop({ required: true })
  coverImage: string;

  @ApiProperty({
    description: 'Additional project images',
    example: [
      '/assets/projects/smart-factory-1.jpg',
      '/assets/projects/smart-factory-2.jpg',
    ],
    type: [String],
  })
  @Prop({ type: [String], default: [] })
  galleryImages: string[];

  @ApiProperty({
    description: 'Project status',
    example: 'In Development',
    enum: [
      'Planning',
      'In Development',
      'Prototyping',
      'Testing',
      'Completed',
      'Deployed',
    ],
  })
  @Prop({ default: 'Planning' })
  status: string;

  @ApiProperty({
    description: 'Main technologies used',
    example: ['STM32', 'FreeRTOS', 'LoRaWAN', 'Modbus'],
    type: [String],
  })
  @Prop({ type: [String], required: true })
  technologies: string[];

  @ApiProperty({
    description: 'Project completion percentage',
    example: 75,
    minimum: 0,
    maximum: 100,
  })
  @Prop({ min: 0, max: 100, default: 0 })
  completion: number;

  @ApiProperty({
    description: 'Project team members',
    example: ['john.doe@factory.com', 'jane.smith@factory.com'],
    type: [String],
  })
  @Prop({ type: [String], default: [] })
  team: string[];

  @ApiProperty({
    description: 'Project documentation URL',
    example: '/docs/smart-factory-system.pdf',
  })
  @Prop()
  documentation?: string;

  @ApiProperty({
    description: 'Git repository URL',
    example: 'https://github.com/factory-lab/smart-monitoring',
  })
  @Prop()
  repository?: string;

  @ApiProperty({
    description: 'Project demonstration video URL',
    example: 'https://youtube.com/watch?v=abc123',
  })
  @Prop()
  videoUrl?: string;

  @ApiProperty({
    description: 'Is this a featured project?',
    example: true,
  })
  @Prop({ default: false })
  isFeatured: boolean;

  @ApiProperty({
    description: 'Project categories',
    example: ['IoT', 'Industrial', 'Monitoring'],
    type: [String],
  })
  @Prop({ type: [String], required: true })
  categories: string[];

  @ApiProperty({
    description: 'Project start date',
    example: '2023-06-01',
  })
  @Prop()
  startDate?: Date;

  @ApiProperty({
    description: 'Expected completion date',
    example: '2023-12-15',
  })
  @Prop()
  targetDate?: Date;

  @ApiProperty({
    description: 'Last updated timestamp',
    example: '2023-09-20T14:30:00Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-06-01T09:00:00Z',
  })
  createdAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
