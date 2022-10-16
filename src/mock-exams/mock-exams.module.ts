import { MockExamCategory } from './entities/mock-exam-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MockExamCategoryService } from './mock-exams-category.service';
import { MockExamCategoryResolver } from './mock-exams-category.resolver';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([MockExamCategory])],
  providers: [MockExamCategoryResolver, MockExamCategoryService],
  exports: [MockExamCategoryService],
})
export class MockExamsModule {}
