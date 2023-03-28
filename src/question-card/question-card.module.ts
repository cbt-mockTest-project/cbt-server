import { QuestionCardResolver } from './question-card.resolver';
import { QuestionCardService } from './question-card.service';
import { QuestionCardCategoryService } from './question-card-category.service';
import { QuestionCardCategory } from './entities/question-card-category';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { QuestionCard } from './entities/question-card.entity';
import { QuestionCardCategoryResolver } from './question-card-category.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionCard, QuestionCardCategory])],
  providers: [
    QuestionCardResolver,
    QuestionCardService,
    QuestionCardCategoryService,
    QuestionCardCategoryResolver,
  ],
})
export class QuestionCardModule {}
