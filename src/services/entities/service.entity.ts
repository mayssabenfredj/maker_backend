import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from 'src/categories/entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Service extends Document {
  @ApiProperty({
    description: 'Name of the service',
    example: 'Embedded System Consultation',
    required: true,
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'Detailed service description',
    example: 'Professional consultation for embedded systems design',
    required: false,
  })
  @Prop()
  description?: string;

  @ApiProperty({
    description: 'Related categories',
    type: [String],
    example: ['64c9e4e5a88f3f001f7d8a9a', '64c9e4e5a88f3f001f7d8a9b'],
    required: false,
  })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }] })
  categories?: Category[];

  @ApiProperty({
    description: 'Service price in USD',
    example: 199.99,
    required: false,
  })
  @Prop()
  price?: number;

  @ApiProperty({
    description: 'Estimated service duration',
    example: '2 weeks',
    required: false,
  })
  @Prop()
  duration?: string;

  @ApiProperty({
    description: 'Service cover image relative path',
    example: '/uploads/services/abc123.jpg',
    required: false,
  })
  @Prop()
  coverImagePath?: string;

  @ApiProperty({
    description: 'Whether the service is active',
    example: true,
    required: false,
  })
  @Prop({ default: true })
  isActive?: boolean;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-01-01T00:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-01-01T00:00:00Z',
  })
  updatedAt: Date;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
