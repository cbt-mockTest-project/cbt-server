import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEvaluation } from './entities/category-evaluation.entity';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { User } from 'src/users/entities/user.entity';
import { CategoryEvaluationResolver } from './category-evaluation.resolver';
import { CategoryEvaluationService } from './category-evaluation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEvaluation, MockExamCategory, User]),
  ],
  providers: [CategoryEvaluationResolver, CategoryEvaluationService],
})
export class CategoryEvaluationModule {}
