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
}
