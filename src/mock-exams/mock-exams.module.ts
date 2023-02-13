import { MockExamQuestionBookmarkSerivce } from './mock-exams-question-bookmark.service';
import { MockExamQuestionBookmarkResolver } from './mock-exams-question-bookmark.resolver';
import { MockExamQuestionCommentLike } from 'src/mock-exams/entities/mock-exam-question-comment-like.entity';
import { MockExamQuestionCommentLikeResolver } from './mock-exams-question-comment-like.resolver';
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
import { MockExamQuestionCommentLikeSerivce } from './mock-exams-question-comment-like.service';
import { MockExamQuestionBookmark } from './entities/mock-exam-question-bookmark.entity';
import { MockExamQuestionMultipleChoiceResolver } from './mock-exams-question-multiple-choice.resolver';
import { MockExamQuestionMultipleChoiceService } from './mock-exams-question-multiple-choice.service';
import { MockExamQuestionMultipleChoice } from './entities/mock-exam-question-multiple-choice.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MockExamCategory,
      MockExam,
      MockExamQuestion,
      MockExamQuestionFeedback,
      MockExamQuestionState,
      MockExamQuestionComment,
      MockExamQuestionCommentLike,
      MockExamQuestionBookmark,
      MockExamQuestionMultipleChoice,
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
    MockExamQuestionCommentLikeResolver,
    MockExamQuestionCommentLikeSerivce,
    MockExamQuestionBookmarkResolver,
    MockExamQuestionBookmarkSerivce,
    MockExamQuestionMultipleChoiceResolver,
    MockExamQuestionMultipleChoiceService,
  ],
  exports: [],
})
export class MockExamsModule {}
