import { Injectable } from '@nestjs/common';
import { ExamCategoryInvitation } from './entities/exam-category-invitation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateExamCategoryInvitationInput,
  CreateExamCategoryInvitationOutput,
} from './dtos/createExamCategoryInvitation.dto';
import { User } from 'src/users/entities/user.entity';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import {
  DeleteExamCategoryInvitationInput,
  DeleteExamCategoryInvitationOutput,
} from './dtos/deleteExamCategoryInvitation.dto';
import { GetExamCategoryInvitationsOutput } from './dtos/getExamCategoryInvitations.dto';
import { ExamCategoryBookmark } from 'src/exam-category-bookmark/entities/exam-category-bookmark';
import {
  AcceptExamCategoryInvitationInput,
  AcceptExamCategoryInvitationOutput,
} from './dtos/acceptExamCategoryInvitation.dto';

@Injectable()
export class ExamCategoryInvitationService {
  constructor(
    @InjectRepository(ExamCategoryInvitation)
    private readonly examCategoryInvitation: Repository<ExamCategoryInvitation>,
    @InjectRepository(MockExamCategory)
    private readonly mockExamCategory: Repository<MockExamCategory>,
    @InjectRepository(ExamCategoryBookmark)
    private readonly examCategoryBookmark: Repository<ExamCategoryBookmark>,
  ) {}

  async createExamCategoryInvitation(
    user: User,
    createExamCategoryInvitationInput: CreateExamCategoryInvitationInput,
  ): Promise<CreateExamCategoryInvitationOutput> {
    try {
      const { categoryId, userIdForInvitation } =
        createExamCategoryInvitationInput;
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
          error: '존재하지 않는 폴더입니다.',
        };
      }

      const isExist = await this.examCategoryInvitation.findOne({
        where: {
          category: {
            id: categoryId,
          },
          user: {
            id: userIdForInvitation,
          },
        },
      });
      if (isExist) {
        return {
          ok: false,
          error: '이미 초대된 사용자입니다.',
        };
      }
      await this.examCategoryInvitation.save(
        this.examCategoryInvitation.create({
          category,
          user: {
            id: userIdForInvitation,
          },
        }),
      );
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: '폴더 초대에 실패했습니다.',
      };
    }
  }

  async deleteExamCategoryInvitation(
    user: User,
    deleteExamCategoryInvitationInput: DeleteExamCategoryInvitationInput,
  ): Promise<DeleteExamCategoryInvitationOutput> {
    try {
      const { invitationId } = deleteExamCategoryInvitationInput;
      const invitation = await this.examCategoryInvitation.findOne({
        where: {
          id: invitationId,
          user: {
            id: user.id,
          },
        },
      });
      if (!invitation) {
        return {
          ok: false,
          error: '존재하지 않는 초대입니다.',
        };
      }
      await this.examCategoryInvitation.delete({
        id: invitationId,
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: '초대 삭제에 실패했습니다.',
      };
    }
  }

  async getExamCategoryInvitations(
    user: User,
  ): Promise<GetExamCategoryInvitationsOutput> {
    try {
      const invitations = await this.examCategoryInvitation.find({
        where: {
          user: {
            id: user.id,
          },
        },
        relations: {
          category: {
            user: true,
          },
        },
      });
      return {
        ok: true,
        invitations,
      };
    } catch (error) {
      return {
        ok: false,
        error: '초대 목록을 가져오는데 실패했습니다.',
      };
    }
  }

  async acceptExamCategoryInvitation(
    user: User,
    acceptExamCategoryInvitationInput: AcceptExamCategoryInvitationInput,
  ): Promise<AcceptExamCategoryInvitationOutput> {
    try {
      const { categoryId } = acceptExamCategoryInvitationInput;
      const invitation = await this.examCategoryInvitation.findOne({
        where: {
          category: {
            id: categoryId,
          },
          user: {
            id: user.id,
          },
        },
      });
      if (!invitation) {
        return {
          ok: false,
          error: '존재하지 않는 초대입니다.',
        };
      }
      await this.examCategoryBookmark.save(
        this.examCategoryBookmark.create({
          category: {
            id: categoryId,
          },
          user: {
            id: user.id,
          },
        }),
      );
      await this.examCategoryInvitation.delete({
        id: invitation.id,
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: '폴더 초대 수락에 실패했습니다.',
      };
    }
  }
}
