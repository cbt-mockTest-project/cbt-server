import { Args, Query, Resolver } from '@nestjs/graphql';
import {
  ReadQuestionCardInput,
  ReadQuestionCardOutput,
} from './dtos/readQuestionCard.dto';
import { QuestionCard } from './entities/question-card.entity';
import { QuestionCardService } from './question-card.service';

@Resolver(() => QuestionCard)
export class QuestionCardResolver {
  constructor(private readonly questionCardService: QuestionCardService) {}

  //crud 만들기
  @Query(() => ReadQuestionCardOutput)
  readQuestionCard(
    @Args('input') readQusetionCardInput: ReadQuestionCardInput,
  ) {
    return this.questionCardService.readQuestionCard(readQusetionCardInput);
  }
}
