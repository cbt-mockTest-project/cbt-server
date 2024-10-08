import { Module } from '@nestjs/common';
import { MockExamCategory } from './entities/mock-exam-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MockExamBookmark } from 'src/exam-bookmark/entities/mock-exam-bookmark.entity';
import { ExamLike } from 'src/exam-like/entities/exam-like.entity';
import { ExamCategoryBookmark } from 'src/exam-category-bookmark/entities/exam-category-bookmark';
import { MockExamCategoryResolver } from './mock-exams-category.resolver';
import { MockExamCategoryService } from './mock-exams-category.service';
import { ExamCategoryBookmarkService } from 'src/exam-category-bookmark/exam-category-bookmark.service';
import { MockExamQuestionState } from 'src/exam/entities/mock-exam-question-state.entity';
import { RevalidateModule } from 'src/revalidate/revalidate.module';
import { Seller } from 'src/seller/entities/seller.entity';
import { CategoryEvaluation } from 'src/category-evaluation/entities/category-evaluation.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { MockExamQuestion } from 'src/exam/entities/mock-exam-question.entity';
import { MockExam } from 'src/exam/entities/mock-exam.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MockExamCategory,
      MockExamBookmark,
      MockExamQuestion,
      MockExam,
      MockExamQuestionState,
      ExamLike,
      ExamCategoryBookmark,
      Seller,
      CategoryEvaluation,
    ]),
  ],
  providers: [
    MockExamCategoryResolver,
    MockExamCategoryService,
    ExamCategoryBookmarkService,
    RevalidateModule,
  ],
})
export class ExamCategoryModule {}
