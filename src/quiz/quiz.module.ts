import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuizComment } from './entities/quizComment.entity';
import { QuizCommentLike } from './entities/quizCommentLike.entity';
import { QuizCommentSerivce } from './quizComment.service';
import { QuizCommentResolver } from './quizComment.resolver';
import { QuizCommentLikeResolver } from './quizCommentLike.resolver';
import { QuizCommentLikeService } from './quizCommentLike.service';
import { QuizService } from './quiz.service';
import { MockExamQuestion } from 'src/exam/entities/mock-exam-question.entity';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { MockExam } from 'src/exam/entities/mock-exam.entity';
import { QuizResolver } from './quiz.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Quiz,
      QuizComment,
      QuizCommentLike,
      MockExamQuestion,
      MockExamCategory,
      MockExam,
    ]),
  ],
  providers: [
    QuizCommentSerivce,
    QuizCommentResolver,
    QuizCommentLikeService,
    QuizCommentLikeResolver,
    QuizResolver,
    QuizService,
  ],
  exports: [QuizService],
})
export class QuizModule {}
