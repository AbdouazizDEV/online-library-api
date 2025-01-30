import {
  Injectable,
  //   NotFoundException,
  ConflictException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { BooksService } from '../books/books.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<Review>,
    @Inject(forwardRef(() => BooksService)) // Utilisez forwardRef
    private readonly booksService: BooksService,
  ) {}

  async create(
    createReviewDto: CreateReviewDto & { bookId: string }, // Ajouter bookId au type
    userId: string,
  ): Promise<Review> {
    const { bookId, comment, rating } = createReviewDto;
    // Vérifier si l'utilisateur a déjà posté un commentaire pour ce livre
    const existingReview = await this.reviewModel.findOne({
      bookId,
      userId,
    });
    if (existingReview) {
      throw new ConflictException('You have already reviewed this book.');
    }
    // Créer le commentaire
    const newReview = new this.reviewModel({
      bookId,
      comment,
      rating,
      userId,
    });
    // Sauvegarder le commentaire
    const savedReview = await newReview.save();
    // Mettre à jour la note moyenne du livre
    await this.booksService.updateBookRating(bookId);

    return savedReview;
  }

  async findAllByBookId(bookId: string): Promise<Review[]> {
    return this.reviewModel.find({ bookId }).exec();
  }

  async findOneByUserIdAndBookId(
    userId: string,
    bookId: string,
  ): Promise<Review | null> {
    return this.reviewModel.findOne({ userId, bookId }).exec();
  }
}
