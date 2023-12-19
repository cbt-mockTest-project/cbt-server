import { Module } from '@nestjs/common';
import { MockExamCategory } from './entities/mock-exam-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MockExamBookmark } from 'src/exam-bookmark/entities/mock-exam-bookmark.entity';
import { ExamLike } from 'src/exam-like/entities/exam-like.entity';
import { ExamCategoryBookmark } from 'src/exam-category-bookmark/entities/exam-category-bookmark';
import { MockExamCategoryResolver } from './mock-exams-category.resolver';
import { MockExamCategoryService } from './mock-exams-category.service';
import { ExamCategoryBookmarkService } from 'src/exam-category-bookmark/exam-category-bookmark.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MockExamCategory,
      MockExamBookmark,
      ExamLike,
      ExamCategoryBookmark,
    ]),
  ],
  providers: [
    MockExamCategoryResolver,
    MockExamCategoryService,
    ExamCategoryBookmarkService,
  ],
})
export class ExamCategoryModule {}
