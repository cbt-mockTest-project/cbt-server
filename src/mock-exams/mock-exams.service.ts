import { ReadMockExamInput, ReadMockExamOutput } from './dtos/readMockExam.dto';
import {
  SearchMockExamInput,
  SearchMockExamOutput,
} from './dtos/searchMockExam.dto';
import {
  ReadAllMockExamsOutput,
  ReadAllMockExamsInput,
} from './dtos/readAllMockExam.dto';
import {
  DeleteMockExamInput,
  DeleteMockExamOutput,
} from './dtos/deleteMockExam.dto';
import { MockExamCategory } from './entities/mock-exam-category.entity';
import { MockExam } from './entities/mock-exam.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import {
  CreateMockExamInput,
  CreateMockExamOutput,
} from './dtos/createMockExam.dto';
import { EditMockExamInput, EditMockExamOutput } from './dtos/editMockExam.dto';

@Injectable()
export class MockExamService {
  constructor(
    @InjectRepository(MockExam)
    private readonly mockExam: Repository<MockExam>,
    @InjectRepository(MockExamCategory)
    private readonly mockExamCategory: Repository<MockExamCategory>,
  ) {}

  async createMockExam(
    createMockExamInput: CreateMockExamInput,
  ): Promise<CreateMockExamOutput> {
    const { title, categoryName } = createMockExamInput;
    const exists = await this.mockExam.findOne({ where: { title } });
    if (exists) {
      return {
        ok: false,
        error: '이미 존재하는 시험입니다.',
      };
    }

    const mockExamCategory = await this.mockExamCategory.findOne({
      where: { name: categoryName },
    });
    if (!mockExamCategory) {
      return {
        ok: false,
        error: '존재하지 않는 카테고리입니다.',
      };
    }
    const newMockExam = this.mockExam.create({
      title,
      mockExamCategory,
      approved: false,
    });
    this.mockExam.save(newMockExam);
    return {
      ok: true,
    };
  }

  async editMockExam(
    editMockExamInput: EditMockExamInput,
  ): Promise<EditMockExamOutput> {
    const { id, title } = editMockExamInput;
    const prevMockExam = await this.mockExam.findOne({
      where: { id },
    });
    if (!prevMockExam) {
      return {
        ok: false,
        error: '존재하지 않는 시험입니다.',
      };
    }
    if (title === prevMockExam.title) {
      return {
        ok: false,
        error: '변경 된 내용이 없습니다.',
      };
    }
    prevMockExam.title = title;
    await this.mockExam.save([prevMockExam]);
    return { ok: true };
  }

  async deleteMockExam(
    deleteMockExamInput: DeleteMockExamInput,
  ): Promise<DeleteMockExamOutput> {
    const { id } = deleteMockExamInput;
    const prevMockExam = await this.mockExam.findOne({ where: { id } });
    if (!prevMockExam) {
      return {
        ok: false,
        error: '존재하지 않는 시험입니다.',
      };
    }
    await this.mockExam.delete({ id });
    return { ok: true };
  }

  async readAllMockExam(
    readAllMockExamsInput: ReadAllMockExamsInput,
  ): Promise<ReadAllMockExamsOutput> {
    try {
      const { query } = readAllMockExamsInput;
      const mockExams = await this.mockExam.find({
        where: {
          title: Raw((title) => `${title} ILIKE '%${query}%'`),
        },
      });
      return { ok: true, mockExams };
    } catch {
      return {
        ok: false,
        error: '시험을 찾을 수 없습니다.',
      };
    }
  }

  async searchMockExam(
    searchMockExamInput: SearchMockExamInput,
  ): Promise<SearchMockExamOutput> {
    try {
      const { query } = searchMockExamInput;
      const [mockExams, totalResults] = await this.mockExam.findAndCount({
        where: {
          title: Raw((title) => `${title} ILIKE '%${query}%'`),
        },
        relations: ['mockExamQuestion'],
      });
      return {
        ok: true,
        totalResults,
        mockExams,
      };
    } catch {
      return {
        ok: false,
        error: '시험을 검색할 수  없습니다.',
      };
    }
  }

  async readMockExam(
    readMockExamInput: ReadMockExamInput,
  ): Promise<ReadMockExamOutput> {
    try {
      const { id } = readMockExamInput;
      const mockExam = await this.mockExam.findOne({
        where: { id },
        relations: [
          'mockExamQuestion',
          'mockExamQuestion.mockExamQuestionFeedback',
        ],
      });
      return {
        ok: true,
        mockExam,
      };
    } catch {
      return {
        ok: false,
        error: '시험을 찾을 수 없습니다.',
      };
    }
  }
}
