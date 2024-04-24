import { Module } from '@nestjs/common';
import { ExamCategoryBookmarkResolver } from './exam-category-bookmark.resolver';
import { ExamCategoryBookmarkService } from './exam-category-bookmark.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamCategoryBookmark } from './entities/exam-category-bookmark';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { CategoryEvaluation } from 'src/category-evaluation/entities/category-evaluation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExamCategoryBookmark,
      MockExamCategory,
      CategoryEvaluation,
    ]),
  ],
  providers: [ExamCategoryBookmarkResolver, ExamCategoryBookmarkService],
  exports: [ExamCategoryBookmarkService],
})
export class ExamCategoryBookmarkModule {}
