import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
  /* NotFoundException, */
  ConflictException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Request } from 'express';

interface AuthRequest extends Request {
  user: {
    userId: string;
    email: string;
    bookId: string;
  };
}
@ApiTags('reviews')
@Controller('books/:bookId/reviews') // Route de base pour les commentaires
@ApiBearerAuth()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add a review to a book' })
  @ApiResponse({ status: 201, description: 'Review added successfully.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  @ApiResponse({
    status: 409,
    description: 'You have already reviewed this book.',
  })
  async create(
    @Param('bookId') bookId: string, // Récupérer l'ID du livre depuis les paramètres de la route
    @Body() createReviewDto: CreateReviewDto, // Récupérer les données du commentaire
    @Req() req: AuthRequest, // Utiliser le type AuthRequest pour éviter les avertissements ESLint
  ) {
    const userId = req.user.userId; // Récupérer l'ID de l'utilisateur depuis le token JWT

    // Ajouter des console.log pour vérifier les valeurs
    console.log('bookId:', bookId);
    console.log('userId:', userId);
    console.log('createReviewDto:', createReviewDto);

    // Vérifier si l'utilisateur a déjà posté un commentaire pour ce livre
    const existingReview = await this.reviewsService.findOneByUserIdAndBookId(
      userId,
      bookId,
    );
    if (existingReview) {
      throw new ConflictException('You have already reviewed this book.');
    }

    // Créer le commentaire
    const newReview = await this.reviewsService.create(
      {
        ...createReviewDto,
        bookId, // Ajouter bookId manuellement
      },
      userId,
    );

    // Retourner le commentaire créé
    return newReview;
  }
}
