// src/books/dto/create-book.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsDate,IsISO8601 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'The Great Gatsby' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'F. Scott Fitzgerald' })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({ required: false, example: '1925-04-10' })
  @IsOptional()
  @IsISO8601() // Valide que la chaîne est au format ISO 8601
  publishedDate?: string; // Changez le type en string

  @ApiProperty({ required: false, example: 'Fiction' })
  @IsOptional()
  @IsString()
  category?: string;
}
