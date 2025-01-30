// src/books/books.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
@ApiTags('books')
@Controller('books')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({status: 201,description: 'The book has been successfully created.' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all books with pagination' })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.booksService.findAll(page, limit);
  }

  @Get('top-rated')
  @ApiOperation({ summary: 'Get top rated books' })
  getTopRated(@Query('limit') limit: number = 5) {
    return this.booksService.getTopRated(limit);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search books' })
  search(
    @Query('title') title?: string,
    @Query('author') author?: string,
    @Query('category') category?: string,
    @Query('sortBy') sortBy?: string,
    @Query('order') order?: 'asc' | 'desc',
  ) {
    return this.booksService.search({ title, author, category, sortBy, order });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by id' })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a book' })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book' })
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
  @Post(':id/rate')
  @ApiOperation({ summary: 'Update book rating' })
  updateBookRating(@Param('id') id: string) {
    return this.booksService.updateBookRating(id);
  }
}
