import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamCategoryInvitation } from './entities/exam-category-invitation.entity';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { ExamCategoryBookmark } from 'src/exam-category-bookmark/entities/exam-category-bookmark';
import { ExamCategoryInvitationService } from './exam-category-invitation.service';
import { ExamCategoryInvitationResolver } from './exam-category-invitation.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExamCategoryInvitation,
      MockExamCategory,
      ExamCategoryBookmark,
    ]),
  ],
  providers: [ExamCategoryInvitationResolver, ExamCategoryInvitationService],
})
export class ExamCategoryInvitationModule {}
