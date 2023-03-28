import { User } from 'src/users/entities/user.entity';
import {
  ReadQuestionCardInput,
  ReadQuestionCardOutput,
} from './dtos/readQuestionCard.dto';
import { QuestionCardCategory } from './entities/question-card-category';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { QuestionCard } from './entities/question-card.entity';
import { In, Repository } from 'typeorm';
import {
  ReadMyQuestionCardsOutput,
  ReadMyQuestionCardsInput,
} from './dtos/readMyQuestionCards.dto';
import {
  CreateQuestionCardInput,
  CreateQuestionCardOutput,
} from './dtos/createQuestionCard.dto';
import {
  UpdateQuestionCardInput,
  UpdateQuestionCardOutput,
} from './dtos/updateQuestionCard.dto';
import {
  DeleteQuestionCardsInput,
  DeleteQuestionCardsOutput,
} from './dtos/deleteQuestionCard.dto';

@Injectable()
export class QuestionCardService {
  constructor(
    @InjectRepository(QuestionCard)
    private readonly questionCard: Repository<QuestionCard>,
    @InjectRepository(QuestionCardCategory)
    private readonly questionCardCategory: Repository<QuestionCardCategory>,
  ) {}

  //crud 만들기
  async readQuestionCard(
    readQusetionCardInput: ReadQuestionCardInput,
  ): Promise<ReadQuestionCardOutput> {
    try {
      const { id } = readQusetionCardInput;
      const questionCard = await this.questionCard.findOne({ where: { id } });
      if (!questionCard) {
        return {
          ok: false,
          error: 'QuestionCard not found',
        };
      }
      return {
        ok: true,
        questionCard,
      };
    } catch {
      return {
        ok: false,
        error: '데이터를 불러오지 못했습니다.',
      };
    }
  }

  async readMyQuestionCards(
    readMyQuestionCardsInput: ReadMyQuestionCardsInput,
    user: User,
  ): Promise<ReadMyQuestionCardsOutput> {
    try {
      const { categoryId } = readMyQuestionCardsInput;
      const questionCards = await this.questionCard.find({
        where: { category: { id: categoryId }, user: { id: user.id } },
      });
      if (!questionCards) {
        return {
          ok: false,
          error: 'QuestionCard not found',
        };
      }
      return {
        ok: true,
        questionCards,
      };
    } catch {
      return {
        ok: false,
        error: '데이터를 불러오지 못했습니다.',
      };
    }
  }

  async createQuestionCard(
    user: User,
    createQuestionCardInput: CreateQuestionCardInput,
  ): Promise<CreateQuestionCardOutput> {
    try {
      const { question, solution, categoryId } = createQuestionCardInput;
      const category = await this.questionCardCategory.findOne({
        where: { id: categoryId },
      });
      if (!category) {
        return {
          ok: false,
          error: 'Category not found',
        };
      }
      const questionCard = await this.questionCard.save(
        this.questionCard.create({
          question,
          solution,
          category,
          user,
        }),
      );
      return {
        ok: true,
        questionCard,
      };
    } catch {
      return {
        ok: false,
        error: '카드 생성에 실패했습니다.',
      };
    }
  }

  async updateQuestionCard(
    user: User,
    updateQuestionCardInput: UpdateQuestionCardInput,
  ): Promise<UpdateQuestionCardOutput> {
    try {
      const { question, solution, questionId } = updateQuestionCardInput;
      const prevQuestionCard = await this.questionCard.findOne({
        relations: { user: true },
        where: { id: questionId, user: { id: user.id } },
      });
      if (!prevQuestionCard) {
        return {
          ok: false,
          error: 'QuestionCard not found',
        };
      }
      const questionCard = await this.questionCard.save({
        id: questionId,
        question: question || prevQuestionCard.question,
        solution: solution || prevQuestionCard.solution,
        user,
      });
      return {
        ok: true,
        questionCard,
      };
    } catch {
      return {
        ok: false,
        error: '카드 수정에 실패했습니다.',
      };
    }
  }

  async deleteQuestionCards(
    deleteQuestionCardInput: DeleteQuestionCardsInput,
    user: User,
  ): Promise<DeleteQuestionCardsOutput> {
    try {
      const { ids } = deleteQuestionCardInput;
      await this.questionCard.delete({
        id: In(ids),
        user: { id: user.id },
      });
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '카드 삭제에 실패했습니다.',
      };
    }
  }
}
