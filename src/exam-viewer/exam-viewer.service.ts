import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamViewer } from './entities/exam-viewer.entity';
import { MockExam } from 'src/mock-exams/entities/mock-exam.entity';
import { MockExamCategory } from 'src/mock-exams/entities/mock-exam-category.entity';
import {
  CreateExamCategoryViewerInput,
  CreateExamCategoryViewerOutput,
} from './dtos/createExamCategoryViewer.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import {
  GetExamCategoryViewrsInput,
  GetExamCategoryViewrsOutput,
} from './dtos/getExamCategoryViewers.dto';
import {
  DeleteExamCategoryViewerInput,
  DeleteExamCategoryViewerOutput,
} from './dtos/deleteExamCategoryViewer.dto';
import {
  UpdateExamViewerArroveStateInput,
  UpdateExamViewerArroveStateOutput,
} from './dtos/updateExamViewerArroveState.dto';
import { GetInvitedExamsOutput } from './dtos/getInvitedExams.dto';

@Injectable()
export class ExamViewerService {
  constructor(
    @InjectRepository(ExamViewer)
    private readonly examViewer: Repository<ExamViewer>,
    @InjectRepository(MockExam)
    private readonly mockExam: Repository<MockExam>,
    @InjectRepository(MockExamCategory)
    private readonly mockExamCategory: Repository<MockExamCategory>,
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  async updateExamViewerArroveState(
    user: User,
    updateExamViewerArroveStateInput: UpdateExamViewerArroveStateInput,
  ): Promise<UpdateExamViewerArroveStateOutput> {
    try {
      const { examViewerId } = updateExamViewerArroveStateInput;
      const examViewer = await this.examViewer.findOne({
        where: {
          id: examViewerId,
          user: {
            id: user.id,
          },
        },
      });
      if (!examViewer) {
        return {
          ok: false,
          error: '등록되지 않은 유저입니다.',
        };
      }
      await this.examViewer.save({
        ...examViewer,
        isApproved: !examViewer.isApprove,
      });
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '시험지 뷰어를 수정할 수 없습니다.',
      };
    }
  }

  async getInvitedExams(user: User): Promise<GetInvitedExamsOutput> {
    try {
      const examViewers = await this.examViewer.find({
        where: {
          user: {
            id: user.id,
          },
        },
        relations: {
          examCategory: {
            user: true,
          },
        },
      });
      return {
        ok: true,
        examViewers,
      };
    } catch {
      return {
        ok: false,
        error: '시험지 뷰어목록을 불러올 수 없습니다.',
      };
    }
  }

  async getExamCategoryViewers(
    user: User,
    getExamCategoryViewrsInput: GetExamCategoryViewrsInput,
  ): Promise<GetExamCategoryViewrsOutput> {
    try {
      const { categoryId } = getExamCategoryViewrsInput;
      const examCategory = await this.mockExamCategory.findOne({
        where: {
          id: categoryId,
          user: {
            id: user.id,
          },
        },
        relations: {
          examViewer: {
            user: true,
          },
        },
      });
      if (!examCategory) {
        return {
          ok: false,
          error: '해당 카테고리를 찾을 수 없습니다.',
        };
      }
      const examViewers = examCategory.examViewer;
      return {
        ok: true,
        examViewers,
      };
    } catch (e) {
      return {
        ok: false,
        error: '카테고리를 찾을 수 없습니다.',
      };
    }
  }

  async deleteExamCategoryViewer(
    user: User,
    deleteExamCategoryViewrInput: DeleteExamCategoryViewerInput,
  ): Promise<DeleteExamCategoryViewerOutput> {
    try {
      const { examViewerId, categoryId } = deleteExamCategoryViewrInput;
      const examCategory = await this.mockExamCategory.findOne({
        where: {
          id: categoryId,
          user: {
            id: user.id,
          },
        },
        relations: {
          examViewer: true,
        },
      });
      if (!examCategory) {
        return {
          ok: false,
          error: '권한이 없습니다.',
        };
      }
      await this.examViewer.delete({
        id: examViewerId,
      });
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: '카테고리를 삭제할 수 없습니다.',
      };
    }
  }

  async createExamCategoryViewer(
    user: User,
    createExamCategoryViewerInput: CreateExamCategoryViewerInput,
  ): Promise<CreateExamCategoryViewerOutput> {
    try {
      const { categoryId, viewerId } = createExamCategoryViewerInput;
      const mockExamCategory = await this.mockExamCategory.findOne({
        where: {
          id: categoryId,
          user: {
            id: user.id,
          },
        },
        relations: {
          mockExam: true,
        },
      });
      if (!mockExamCategory) {
        return {
          ok: false,
          error: '해당 카테고리를 찾을 수 없습니다.',
        };
      }
      const userDataForViewer = await this.user.findOne({
        where: {
          id: viewerId,
        },
      });
      const examViewerExist = await this.examViewer.findOne({
        where: {
          user: {
            id: viewerId,
          },
          examCategory: {
            id: categoryId,
          },
        },
      });
      if (examViewerExist) {
        return {
          ok: false,
          error: '이미 등록된 유저입니다.',
        };
      }

      const examViewer = await this.examViewer.save(
        this.examViewer.create({
          user: userDataForViewer,
          examCategory: mockExamCategory,
        }),
      );
      return {
        ok: true,
        examViewer,
      };
    } catch (e) {
      return {
        ok: false,
        error: '카테고리를 등록할 수 없습니다.',
      };
    }
  }
}
