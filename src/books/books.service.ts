// src/books/books.service.ts
import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ReviewsService } from '../reviews/reviews.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
    @Inject(forwardRef(() => ReviewsService)) // Utilisez forwardRef
    private readonly reviewsService: ReviewsService,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }

  async findAll(page = 1, limit = 10): Promise<{ data: Book[]; total: number; page: number; totalPages: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.bookModel.find().skip(skip).limit(limit).exec(),
      this.bookModel.countDocuments(),
    ]);

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).populate('reviews');
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true })
      .exec();

    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return updatedBook;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.bookModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    /* retourner un message de success ou un message d'erreur */
    return { message: 'Book deleted successfully' };
  }

  async getTopRated(limit = 5): Promise<Book[]> {
    return this.bookModel.find().sort({ rating: -1 }).limit(limit).exec();
  }

  async search(query: {
    title?: string;
    author?: string;
    category?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }): Promise<Book[]> {
    const { title, author, category, sortBy, order } = query;
    const filter: any = {};

    if (title) filter.title = new RegExp(title, 'i');
    if (author) filter.author = new RegExp(author, 'i');
    if (category) filter.category = new RegExp(category, 'i');

    const sort: any = {};
    if (sortBy) {
      sort[sortBy] = order === 'desc' ? -1 : 1;
    }

    return this.bookModel.find(filter).sort(sort).exec();
  }

  async updateBookRating(bookId: string): Promise<void> {
    const reviews = await this.reviewsService.findAllByBookId(bookId);

    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / reviews.length;

      await this.bookModel.findByIdAndUpdate(bookId, {
        rating: averageRating,
      });
    } else {
      await this.bookModel.findByIdAndUpdate(bookId, {
        rating: 0,
      });
    }
  }
}
