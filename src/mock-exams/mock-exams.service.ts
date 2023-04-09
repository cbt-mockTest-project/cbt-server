import { deduplication } from './../utils/utils';
import { User, UserRole } from './../users/entities/user.entity';
import { MockExamQuestionState } from 'src/mock-exams/entities/mock-exam-question-state.entity';
import {
  ExamTitleAndId,
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
import { Raw, Repository, FindOptionsWhere, Brackets } from 'typeorm';
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
    user: User,
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
      user,
    });
    const mockExam = await this.mockExam.save(newMockExam);
    return {
      ok: true,
      mockExam,
    };
  }

  async editMockExam(
    user: User,
    editMockExamInput: EditMockExamInput,
  ): Promise<EditMockExamOutput> {
    const { id, title } = editMockExamInput;
    const prevMockExam = await this.mockExam.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!prevMockExam) {
      return {
        ok: false,
        error: '존재하지 않는 시험입니다.',
      };
    }

    if (prevMockExam.approved && title) {
      return {
        ok: false,
        error: '승인된 시험지는 수정할 수 없습니다.',
      };
    }
    if (prevMockExam.user.id !== user.id) {
      return {
        ok: false,
        error: '권한이 없습니다.',
      };
    }

    await this.mockExam.save([editMockExamInput]);
    return { ok: true };
  }

  async deleteMockExam(
    user: User,
    deleteMockExamInput: DeleteMockExamInput,
  ): Promise<DeleteMockExamOutput> {
    try {
      const { id } = deleteMockExamInput;
      const prevMockExam = await this.mockExam.findOne({
        where: { id },
        relations: { user: true },
      });
      if (!prevMockExam) {
        return {
          ok: false,
          error: '존재하지 않는 시험입니다.',
        };
      }
      if (prevMockExam.approved) {
        return {
          ok: false,
          error: '승인된 시험지는 삭제할 수 없습니다.',
        };
      }
      if (prevMockExam.user.id !== user.id) {
        return {
          ok: false,
          error: '권한이 없습니다.',
        };
      }
      await this.mockExam.delete({ id });
      return { ok: true };
    } catch (e) {
      return {
        ok: false,
        error: '시험지 삭제에 실패했습니다.',
      };
    }
  }

  async readAllMockExam(
    readAllMockExamsInput: ReadAllMockExamsInput,
  ): Promise<ReadAllMockExamsOutput> {
    try {
      const { query, category, all } = readAllMockExamsInput;
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
      if (!all) {
        mockExams = mockExams.filter(
          (exam) => exam.mockExamQuestion.length >= 1 && exam.approved,
        );
      }
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
    user: User,
    readMockExamTitlesByCateoryInput: ReadMockExamTitlesByCateoryInput,
  ): Promise<ReadMockExamTitlesByCateoryOutput> {
    try {
      const { name, all } = readMockExamTitlesByCateoryInput;
      let mockExamTitles: MockExam[] = [];
      if (!all) {
        mockExamTitles = await this.mockExam
          .createQueryBuilder('mockExam')
          .leftJoin('mockExam.user', 'user')
          .leftJoin('mockExam.mockExamCategory', 'category')
          .select([
            'mockExam.id',
            'mockExam.title',
            'mockExam.status',
            'mockExam.slug',
            'user.role',
          ])
          .where('category.name = :name', { name })
          .andWhere('mockExam.approved = true')
          .getMany();
      } else if (all && user) {
        // 내 시험지에서 타이틀 불러오기 할 경우
        if (!user) {
          return {
            ok: false,
            error: '로그인이 필요합니다.',
          };
        }
        if (user.role === UserRole.ADMIN) {
          mockExamTitles = await this.mockExam
            .createQueryBuilder('mockExam')
            .leftJoin('mockExam.user', 'user')
            .leftJoin('mockExam.mockExamCategory', 'category')
            .leftJoin('mockExam.examCoAuthor', 'examCoAuthor')
            .select([
              'mockExam.id',
              'mockExam.title',
              'mockExam.status',
              'mockExam.slug',
              'user.role',
            ])
            .where('category.name = :name', { name })
            .getMany();
        } else {
          mockExamTitles = await this.mockExam
            .createQueryBuilder('mockExam')
            .leftJoin('mockExam.user', 'user')
            .leftJoin('mockExam.mockExamCategory', 'category')
            .leftJoin('mockExam.examCoAuthor', 'examCoAuthor')
            .select([
              'mockExam.id',
              'mockExam.title',
              'mockExam.status',
              'mockExam.slug',
              'user.role',
            ])
            .where('category.name = :name', { name })
            .andWhere(
              new Brackets((qb) => {
                qb.where('mockExam.user.id = :userId', {
                  userId: user.id,
                }).orWhere('examCoAuthor.user.id = :userId', {
                  userId: user.id,
                });
              }),
            )
            .getMany();
        }
      }
      if (!mockExamTitles) {
        return {
          ok: false,
          error: '해당 카테고리에 맞는 시험이 존재하지 않습니다.',
        };
      }
      const titles: ExamTitleAndId[] = mockExamTitles
        .sort((a, b) => {
          return (
            Number(b.title.split('년')[0]) - Number(a.title.split('년')[0]) ||
            Number(b.title.split('-').at(-1).split('회차')[0]) -
              Number(a.title.split('-').at(-1).split('회차')[0])
          );
        })
        .map((el) => ({ ...el, role: el.user.role }));
      return {
        titles,
        ok: true,
      };
    } catch (e) {
      console.log(e);
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
  // async syncExamSlug() {
  //   const slugify = (title: string) => {
  //     const splited = title.split('-');
  //     return splited[0] + '-' + splited.at(-1);
  //   };
  //   const mockExams = await this.mockExam.find();
  //   for (const mockExam of mockExams) {
  //     const slug = slugify(mockExam.title);
  //     await this.mockExam.update(mockExam.id, { slug });
  //   }
  //   return {
  //     ok: true,
  //   };
  // }
}
