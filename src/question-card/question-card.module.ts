import { QuestionCardCategory } from './entities/question-card-category';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { QuestionCard } from './entities/question-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionCard, QuestionCardCategory])],
})
export class QuestionCardModule {}
