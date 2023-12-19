import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamCategoryInvitation } from './entities/exam-category-invitation.entity';
import { MockExamCategory } from 'src/mock-exams/entities/mock-exam-category.entity';
import { ExamCategoryBookmark } from 'src/exam-category-bookmark/entities/exam-category-bookmark';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExamCategoryInvitation,
      MockExamCategory,
      ExamCategoryBookmark,
    ]),
  ],
  providers: [],
})
export class ExamCategoryInvitationModule {}
