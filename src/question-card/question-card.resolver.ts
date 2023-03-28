import {
  DeleteQuestionCardsInput,
  DeleteQuestionCardsOutput,
} from './dtos/deleteQuestionCard.dto';
import { User } from 'src/users/entities/user.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import {
  ReadMyQuestionCardsInput,
  ReadMyQuestionCardsOutput,
} from './dtos/readMyQuestionCards.dto';
import {
  ReadQuestionCardInput,
  ReadQuestionCardOutput,
} from './dtos/readQuestionCard.dto';
import { QuestionCard } from './entities/question-card.entity';
import { QuestionCardService } from './question-card.service';
import {
  CreateQuestionCardInput,
  CreateQuestionCardOutput,
} from './dtos/createQuestionCard.dto';
import {
  UpdateQuestionCardOutput,
  UpdateQuestionCardInput,
} from './dtos/updateQuestionCard.dto';
import { Role } from 'src/auth/role.decorators';

@Resolver(() => QuestionCard)
export class QuestionCardResolver {
  constructor(private readonly questionCardService: QuestionCardService) {}

  @Role(['ANY'])
  @Query(() => ReadQuestionCardOutput)
  readQuestionCard(
    @Args('input') readQusetionCardInput: ReadQuestionCardInput,
  ) {
    return this.questionCardService.readQuestionCard(readQusetionCardInput);
  }

  @Role(['ANY'])
  @Query(() => ReadMyQuestionCardsOutput)
  readMyQuestionCards(
    @Args('input') readMyQuestionCardsInput: ReadMyQuestionCardsInput,
    @AuthUser() user: User,
  ) {
    return this.questionCardService.readMyQuestionCards(
      readMyQuestionCardsInput,
      user,
    );
  }

  @Role(['ANY'])
  @Mutation(() => CreateQuestionCardOutput)
  createQuestionCard(
    @Args('input') createQuestionCardInput: CreateQuestionCardInput,
    @AuthUser() user: User,
  ) {
    return this.questionCardService.createQuestionCard(
      user,
      createQuestionCardInput,
    );
  }

  @Role(['ANY'])
  @Mutation(() => UpdateQuestionCardOutput)
  updateQuestionCard(
    @Args('input') updateQuestionCardInput: UpdateQuestionCardInput,
    @AuthUser() user: User,
  ) {
    return this.questionCardService.updateQuestionCard(
      user,
      updateQuestionCardInput,
    );
  }

  @Mutation(() => DeleteQuestionCardsOutput)
  deleteQuestionCards(
    @Args('input') deleteQuestionCardsInput: DeleteQuestionCardsInput,
    @AuthUser() user: User,
  ) {
    return this.questionCardService.deleteQuestionCards(
      deleteQuestionCardsInput,
      user,
    );
  }
}
