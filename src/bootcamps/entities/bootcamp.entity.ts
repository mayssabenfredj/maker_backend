import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from '../../categories/entities/category.entity';
import { Product } from '../../products/entities/product.entity';
import { Participant } from '../../participants/entities/participant.entity';

@Schema()
export class Bootcamp extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Category | Types.ObjectId;

  @Prop({ required: true })
  types: string[];

  @Prop()
  description?: string;

  @Prop([String])
  images?: string[];

  @Prop({ required: true })
  dateDebut: Date;

  @Prop({ required: true })
  dateFin: Date;

  @Prop()
  periode?: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  animator: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Participant' }] })
  participants?: Participant[] | Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  products?: Product[] | Types.ObjectId[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const BootcampSchema = SchemaFactory.createForClass(Bootcamp);
