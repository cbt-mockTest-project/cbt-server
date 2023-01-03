import { MockExamQuestionCommentSerivce } from './mock-exams-question-comment.service';
import { User } from 'src/users/entities/user.entity';
import { MockExamQuestionStateService } from './mock-exams-question-state.service';
import { MockExamQuestionStateResolver } from './mock-exams-question-state.resolver';
import { MockExamQuestionFeedback } from './entities/mock-exam-question-feedback.entity';
import { MockExamQuestionFeedbackSerivce } from './mock-exams-question-feedback.service';
import { MockExamQuestionFeedbackResolver } from './mock-exams-question-feedback.resolver';
import { MockExamQuestion } from './entities/mock-exam-question.entity';
import { MockExamQuestionResolver } from './mock-exams-question.resolver';
import { MockExam } from './entities/mock-exam.entity';
import { MockExamResolver } from './mock-exams.resolver';
import { MockExamCategory } from './entities/mock-exam-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MockExamCategoryService } from './mock-exams-category.service';
import { MockExamCategoryResolver } from './mock-exams-category.resolver';
import { Module } from '@nestjs/common';
import { MockExamService } from './mock-exams.service';
import { MockExamQuestionService } from './mock-exams-question.service';
import { MockExamQuestionState } from './entities/mock-exam-question-state.entity';
import { MockExamQuestionComment } from './entities/mock-exam-question-comment.entity';
import { MockExamQuestionCommentResolver } from './mock-exams-question-comment.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MockExamCategory,
      MockExam,
      MockExamQuestion,
      MockExamQuestionFeedback,
      MockExamQuestionState,
      MockExamQuestionComment,
      User,
    ]),
  ],
  providers: [
    MockExamCategoryResolver,
    MockExamCategoryService,
    MockExamResolver,
    MockExamService,
    MockExamQuestionResolver,
    MockExamQuestionService,
    MockExamQuestionFeedbackResolver,
    MockExamQuestionFeedbackSerivce,
    MockExamQuestionStateResolver,
    MockExamQuestionStateService,
    MockExamQuestionCommentResolver,
    MockExamQuestionCommentSerivce,
  ],
  exports: [],
})
export class MockExamsModule {}
