import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { User } from 'src/users/entities/user.entity';
import { CategoryInvitationLink } from './entities/category-invitation-link.entity';
import { CategoryInvitationLinkResolver } from './category-invitation-link.resolver';
import { CategoryInvitationLinkService } from './category-invitation-link.service';
import { ExamCategoryBookmarkService } from 'src/exam-category-bookmark/exam-category-bookmark.service';
import { ExamCategoryBookmark } from 'src/exam-category-bookmark/entities/exam-category-bookmark';
import { CategoryEvaluation } from 'src/category-evaluation/entities/category-evaluation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoryInvitationLink,
      MockExamCategory,
      User,
      ExamCategoryBookmark,
      CategoryEvaluation,
    ]),
  ],
  providers: [
    CategoryInvitationLinkResolver,
    CategoryInvitationLinkService,
    ExamCategoryBookmarkService,
  ],
})
export class CategoryInvitationLinkModule {}
