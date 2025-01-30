// src/books/books.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { ReviewsService } from '../reviews/reviews.service';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: {
            create: jest.fn().mockResolvedValue({
              _id: '679b2e93167e7cc1fe819c77',
              title: 'Le Dicateur',
              author: 'Antoumane',
              publishedDate: new Date(),
              category: 'Action',
              rating: 0,
              reviews: [],
            }),
          },
        },
        {
          provide: ReviewsService,
          useValue: {
            updateBookRating: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
