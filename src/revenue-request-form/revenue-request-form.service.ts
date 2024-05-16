import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  RevenueRequestForm,
  RevenueRequestFormStatus,
} from './entites/revenue-request-form.entity';
import {
  CreateRevenueRequestFormInput,
  CreateRevenueRequestFormOutput,
} from './dtos/create-revenue-request-form.dto';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import { User } from 'src/users/entities/user.entity';
import {
  UpdateRevenueRequestFormInput,
  UpdateRevenueRequestFormOutput,
} from './dtos/update-revenue-request-form.dto';
import { GetRevenueRequestFormsOutput } from './dtos/get-revenue-request-forms.dto';

@Injectable()
export class RevenueRequestFormService {
  constructor(
    @InjectRepository(RevenueRequestForm)
    private readonly revenueRequestForms: Repository<RevenueRequestForm>,
    @InjectRepository(MockExamCategory)
    private readonly mockExamCategories: Repository<MockExamCategory>,
  ) {}

  async createRevenueRequestForm(
    user: User,
    createRevenueRequestFormInput: CreateRevenueRequestFormInput,
  ): Promise<CreateRevenueRequestFormOutput> {
    const { categoryId } = createRevenueRequestFormInput;
    const category = await this.mockExamCategories.findOne({
      where: {
        id: categoryId,
        user: {
          id: user.id,
        },
      },
      relations: {
        revenueRequestForm: true,
      },
    });
    if (!category) {
      return {
        ok: false,
        error: '존재하지 않는 암기장입니다.',
      };
    }
    if (
      category.revenueRequestForm?.status === RevenueRequestFormStatus.PENDING
    ) {
      return {
        ok: false,
        error: '현재 승인 대기중인 암기장입니다.',
      };
    }
    if (
      category.revenueRequestForm?.status === RevenueRequestFormStatus.APPROVED
    ) {
      return {
        ok: false,
        error: '이미 승인된 암기장입니다.',
      };
    }
    const revenueRequestForm = await this.revenueRequestForms.save({
      ...category.revenueRequestForm,
      status: RevenueRequestFormStatus.PENDING,
      category,
    });
    return { ok: true, revenueRequestForm };
  }

  async updateRevenueRequestForm(
    updateRevenueRequestFormInput: UpdateRevenueRequestFormInput,
  ): Promise<UpdateRevenueRequestFormOutput> {
    try {
      const { id, status, reason } = updateRevenueRequestFormInput;
      const revenueRequestForm = await this.revenueRequestForms.findOne({
        where: {
          id,
        },
      });
      if (!revenueRequestForm) {
        return {
          ok: false,
          error: '존재하지 않는 수익 신청서입니다.',
        };
      }
      if (status) {
        revenueRequestForm.status = status;
      }
      if (reason) {
        revenueRequestForm.reason = reason;
      }
      await this.revenueRequestForms.save(revenueRequestForm);
      return { ok: true };
    } catch {
      return {
        ok: false,
        error: '수익 신청서를 업데이트할 수 없습니다.',
      };
    }
  }

  async getRevenueRequestForms(): Promise<GetRevenueRequestFormsOutput> {
    try {
      const revenueRequestForms = await this.revenueRequestForms.find({
        order: {
          created_at: 'DESC',
        },
      });
      return { ok: true, revenueRequestForms };
    } catch {
      return {
        ok: false,
        error: '수익 신청서를 불러올 수 없습니다.',
      };
    }
  }
}
