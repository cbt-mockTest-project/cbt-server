import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryInvitationLink } from './entities/category-invitation-link.entity';
import { Repository } from 'typeorm';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { User } from 'src/users/entities/user.entity';
import {
  CreateCategoryInvitationLinkInput,
  CreateCategoryInvitationLinkOutput,
} from './dtos/create-category-invitation-link.dto';
import { v4 as uuidv4 } from 'uuid';
import {
  ApproveCategoryInvitationLinkInput,
  ApproveCategoryInvitationLinkOutput,
} from './dtos/approve-category-invitation-link.dto';
import { ExamCategoryBookmarkService } from 'src/exam-category-bookmark/exam-category-bookmark.service';

@Injectable()
export class CategoryInvitationLinkService {
  constructor(
    @InjectRepository(CategoryInvitationLink)
    private readonly categoryInvitationLink: Repository<CategoryInvitationLink>,
    @InjectRepository(MockExamCategory)
    private readonly mockExamCategory: Repository<MockExamCategory>,
    @InjectRepository(User)
    private readonly user: Repository<User>,
    private readonly examCategoryBookmarkService: ExamCategoryBookmarkService,
  ) {}

  async createCategoryInvitationLink(
    user: User,
    createCategoryInvitationLinkInput: CreateCategoryInvitationLinkInput,
  ): Promise<CreateCategoryInvitationLinkOutput> {
    try {
      const { categoryId } = createCategoryInvitationLinkInput;
      const category = await this.mockExamCategory.findOne({
        where: {
          id: categoryId,
          user: {
            id: user.id,
          },
        },
      });
      if (!category) {
        return {
          ok: false,
          error: '존재하지 않는 암기장입니니다.',
        };
      }
      const code = uuidv4();
      await this.categoryInvitationLink.save(
        this.categoryInvitationLink.create({
          category,
          code,
        }),
      );
      return {
        ok: true,
        code,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: '초대링크를 생성 할 수 없습니다.',
      };
    }
  }

  async approveCategoryInvitationLink(
    user: User,
    approveCategoryInvitationLinkInput: ApproveCategoryInvitationLinkInput,
  ): Promise<ApproveCategoryInvitationLinkOutput> {
    try {
      const { code } = approveCategoryInvitationLinkInput;
      const invitationLink = await this.categoryInvitationLink.findOne({
        where: {
          code,
        },
        relations: {
          category: true,
          user: true,
        },
      });
      if (invitationLink.user?.id === user.id) {
        return {
          ok: false,
          error: '이미 초대된 암기장입니다.',
        };
      }
      if (!invitationLink) {
        return {
          ok: false,
          error: '초대링크를 찾을 수 없습니다.',
        };
      }
      if (invitationLink.isUsed) {
        return {
          ok: false,
          error: '만료된 링크입니다.',
        };
      }
      invitationLink.isUsed = true;
      invitationLink.user = user;
      await this.examCategoryBookmarkService.createExamCategoryBookmark(user, {
        categoryId: invitationLink.category.id,
      });
      await this.categoryInvitationLink.save(invitationLink);
      return {
        ok: true,
        categoryName: invitationLink.category.name,
        urlSlug: invitationLink.category.urlSlug,
        examType: invitationLink.category.examType,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: '알수 없는 오류가 발생했습니다.',
      };
    }
  }
}
