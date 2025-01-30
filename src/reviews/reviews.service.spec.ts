import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';
import { getModelToken } from '@nestjs/mongoose';
import { Review } from './schemas/review.schema';
import { BooksService } from '../books/books.service';

describe('ReviewsService', () => {
  let service: ReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        {
          provide: getModelToken(Review.name),
          useValue: {
            create: jest.fn().mockResolvedValue({
              _id: '507f1f77bcf86cd799439012',
              comment: 'This book is amazing!',
              rating: 5,
              userId: '507f1f77bcf86cd799439011',
              bookId: '679b2e93167e7cc1fe819c77',
            }),
            findOne: jest.fn().mockResolvedValue(null),
          },
        },
        {
          provide: BooksService,
          useValue: {
            updateBookRating: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
