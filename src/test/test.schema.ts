// src/test/test.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Test extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  createdAt: Date;
}

export const TestSchema = SchemaFactory.createForClass(Test);
