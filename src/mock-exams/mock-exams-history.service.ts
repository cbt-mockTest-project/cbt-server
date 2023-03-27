import { ReadMyExamHistoryOutput } from './dtos/readMyExamHistory.dto';
import { User } from 'src/users/entities/user.entity';
import { MockExam } from 'src/mock-exams/entities/mock-exam.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MockExamHistory } from './entities/mock-exam-history';
import {
  CreateMockExamHistoryInput,
  CreateMockExamHistoryOutput,
} from './dtos/createMockExamHistory';

@Injectable()
export class MockExamHistoryService {
  constructor(
    @InjectRepository(MockExamHistory)
    private readonly mockExamHistory: Repository<MockExamHistory>,
    @InjectRepository(MockExam)
    private readonly mockExam: Repository<MockExam>,
  ) {}

  async createMockExamHistory(
    createMockExamHistoryInput: CreateMockExamHistoryInput,
    user: User,
  ): Promise<CreateMockExamHistoryOutput> {
    try {
      const { examId } = createMockExamHistoryInput;
      const prevMockExam = await this.mockExamHistory.findOne({
        relations: { user: true, exam: true },
        where: { exam: { id: examId }, user: { id: user.id } },
      });

      if (prevMockExam) {
        await this.mockExamHistory.update(prevMockExam.id, {});
        return {
          ok: true,
        };
      }
      await this.mockExamHistory.save(
        this.mockExamHistory.create({
          exam: { id: examId },
          user,
        }),
      );
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '시험 기록에 실패했습니다.',
      };
    }
  }

  async readMyExamHistory(user: User): Promise<ReadMyExamHistoryOutput> {
    try {
      const mockExamHistories = await this.mockExamHistory.find({
        where: { user: { id: user.id } },
        order: { updated_at: 'DESC' },
        relations: ['exam'],
      });
      const mockExams = mockExamHistories.map((mockExamHistory) => ({
        ...mockExamHistory.exam,
        updated_at: mockExamHistory.updated_at,
      }));
      return { ok: true, mockExams };
    } catch {
      return {
        ok: false,
        error: '시험 기록을 불러오는데 실패했습니다.',
      };
    }
  }
}
