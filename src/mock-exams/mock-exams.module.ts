import { MockExam } from './entities/mock-exam.entity';
import { MockExamResolver } from './mock-exams.resolver';
import { MockExamCategory } from './entities/mock-exam-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MockExamCategoryService } from './mock-exams-category.service';
import { MockExamCategoryResolver } from './mock-exams-category.resolver';
import { Module } from '@nestjs/common';
import { MockExamService } from './mock-exams.service';

@Module({
  imports: [TypeOrmModule.forFeature([MockExamCategory, MockExam])],
  providers: [
    MockExamCategoryResolver,
    MockExamCategoryService,
    MockExamResolver,
    MockExamService,
  ],
  exports: [],
})
export class MockExamsModule {}
