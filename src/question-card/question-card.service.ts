import { User } from 'src/users/entities/user.entity';
import {
  ReadQuestionCardInput,
  ReadQuestionCardOutput,
} from './dtos/readQuestionCard.dto';
import { QuestionCardCategory } from './entities/question-card-category';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { QuestionCard } from './entities/question-card.entity';
import { Repository } from 'typeorm';
import {
  ReadMyQuestionCardsOutput,
  ReadMyQuestionCardsInput,
} from './dtos/readMyQuestionCards.dto';

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
  }

  async readAllQuestionCards(
    readMyQuestionCardsInput: ReadMyQuestionCardsInput,
    user: User,
  ): Promise<ReadMyQuestionCardsOutput> {
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
  }
}
