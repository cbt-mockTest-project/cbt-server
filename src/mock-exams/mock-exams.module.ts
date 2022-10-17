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

@Module({
  imports: [
    TypeOrmModule.forFeature([MockExamCategory, MockExam, MockExamQuestion]),
  ],
  providers: [
    MockExamCategoryResolver,
    MockExamCategoryService,
    MockExamResolver,
    MockExamService,
    MockExamQuestionResolver,
    MockExamQuestionService,
  ],
  exports: [],
})
export class MockExamsModule {}
