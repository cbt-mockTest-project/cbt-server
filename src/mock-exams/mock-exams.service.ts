import { deduplication } from './../utils/utils';
import { User } from './../users/entities/user.entity';
import { MockExamQuestionState } from 'src/mock-exams/entities/mock-exam-question-state.entity';
import {
  ReadMockExamTitlesByCateoryInput,
  ReadMockExamTitlesByCateoryOutput,
} from './dtos/readMockExamTitlesByCateory.dto';
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
import { Raw, Repository, FindOptionsWhere } from 'typeorm';
import {
  CreateMockExamInput,
  CreateMockExamOutput,
} from './dtos/createMockExam.dto';
import { EditMockExamInput, EditMockExamOutput } from './dtos/editMockExam.dto';
import {
  FindMyExamHistoryOutput,
  FindMyExamHistoryInput,
  TitleAndId,
} from './dtos/findMyExamHistory.dto';

@Injectable()
export class MockExamService {
  constructor(
    @InjectRepository(MockExam)
    private readonly mockExam: Repository<MockExam>,
    @InjectRepository(MockExamCategory)
    private readonly mockExamCategory: Repository<MockExamCategory>,
    @InjectRepository(MockExamQuestionState)
    private readonly mockExamQuestionState: Repository<MockExamQuestionState>,
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
      const { query, category } = readAllMockExamsInput;
      let mockExams = await this.mockExam.find({
        where: {
          title: Raw((title) => `${title} ILIKE '%${query}%'`),
          mockExamCategory: {
            name: Raw((name) => `${name} ILIKE '%${category}%'`),
          },
        },
        relations: { mockExamQuestion: true },
        order: {
          title: 'ASC',
        },
      });
      mockExams = mockExams.filter((exam) => exam.mockExamQuestion.length >= 1);
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
        order: {
          mockExamQuestion: {
            number: 'ASC',
          },
        },
      });
      const questionNumbers = mockExam.mockExamQuestion.map(
        (data) => data.number,
      );
      return {
        ok: true,
        mockExam,
        questionNumbers,
      };
    } catch {
      return {
        ok: false,
        error: '시험을 찾을 수 없습니다.',
      };
    }
  }

  async readMockExamTitlesByCateory(
    readMockExamTitlesByCateoryInput: ReadMockExamTitlesByCateoryInput,
  ): Promise<ReadMockExamTitlesByCateoryOutput> {
    try {
      const { name } = readMockExamTitlesByCateoryInput;
      let mockExamTitles = await this.mockExam.find({
        where: { mockExamCategory: { name } },
        relations: {
          mockExamQuestion: true,
        },
        select: ['title', 'id'],
      });
      if (!mockExamTitles) {
        return {
          ok: false,
          error: '해당 카테고리에 맞는 시험이 존재하지 않습니다.',
        };
      }
      mockExamTitles = mockExamTitles
        .filter((exam) => exam.mockExamQuestion.length)
        .sort((a, b) => {
          return (
            Number(a.title.split('년')[0]) - Number(b.title.split('년')[0]) ||
            Number(a.title.split('-').at(-1).split('회차')[0]) -
              Number(b.title.split('-').at(-1).split('회차')[0])
          );
        });
      return {
        titles: mockExamTitles,
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '타이틀을 찾을 수 없습니다.',
      };
    }
  }

  async findMyExamHistory(
    user: User,
    findMyExamHistoryInput: FindMyExamHistoryInput,
  ): Promise<FindMyExamHistoryOutput> {
    try {
      const commonAndConditions = { user: { id: user.id } };
      const { categoryIds } = findMyExamHistoryInput;
      const where:
        | FindOptionsWhere<MockExamQuestionState>[]
        | FindOptionsWhere<MockExamQuestionState> =
        categoryIds.length !== 0
          ? categoryIds.map((id) => ({
              ...commonAndConditions,
              exam: { mockExamCategory: { id } },
            }))
          : commonAndConditions;
      const res = await this.mockExamQuestionState.find({
        where,
        select: ['exam'],
        relations: {
          exam: true,
        },
      });
      if (!res) {
        return {
          ok: false,
          error: '시험내역이 존재하지 않습니다.',
        };
      }
      const examsTitleAndId: TitleAndId[] = deduplication(
        res.map((el) => ({ id: el.exam.id, title: el.exam.title })),
      ).sort((a, b) => {
        return Number(a.title.split('년')[0]) - Number(b.title.split('년')[0]);
      });
      return {
        ok: true,
        titleAndId: examsTitleAndId,
      };
    } catch {
      return {
        ok: false,
        error: '시험기록을 조회할 수 없습니다.',
      };
    }
  }
}
