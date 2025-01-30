import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { Review, ReviewSchema } from './schemas/review.schema';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    forwardRef(() => BooksModule), // Utilisez forwardRef
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService], // Exportez ReviewsService si nécessaire
})
export class ReviewsModule {}
