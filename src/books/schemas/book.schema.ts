// src/books/schemas/book.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Review } from '../../reviews/schemas/review.schema';

@Schema({ timestamps: true })
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop()
  publishedDate: Date;

  @Prop()
  category: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Review' }] })
  reviews: Review[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
