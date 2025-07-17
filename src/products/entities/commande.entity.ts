import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CommandeProduct extends Document {
  @Prop()
  fullname: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  adresseLivraison?: string;

  @Prop()
  message?: string;

  @Prop({ default: false })
  withFormation?: boolean;
}

export const CommandeProductSchema =
  SchemaFactory.createForClass(CommandeProduct);
