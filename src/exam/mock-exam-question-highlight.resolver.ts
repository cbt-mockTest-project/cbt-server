import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MockExamQuestionHighlight } from './entities/mock-exam-question-highlight.entity';
import { MockExamQuestionHighlightService } from './mock-exam-question-highlight.service';
import {
  InsertQuestionHighlightInput,
  InsertQuestionHighlightOutput,
} from './dtos/insertQuestionHighlight.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/auth/role.decorators';
import {
  DeleteQuestionHighlightInput,
  DeleteQuestionHighlightOutput,
} from './dtos/deleteQuestionHighlight.dto';

@Resolver(() => MockExamQuestionHighlight)
export class MockExamQuestionHighlightResolver {
  constructor(
    private readonly mockExamQuestionHighlightService: MockExamQuestionHighlightService,
  ) {}

  @Role(['ANY'])
  @Mutation(() => InsertQuestionHighlightOutput)
  async insertQuestionHighlight(
    @AuthUser() user: User,
    @Args('input') insertQuestionHighlightInput: InsertQuestionHighlightInput,
  ) {
    return this.mockExamQuestionHighlightService.insertQuestionHighlight(
      user,
      insertQuestionHighlightInput,
    );
  }

  @Role(['ANY'])
  @Mutation(() => DeleteQuestionHighlightOutput)
  async deleteQuestionHighlight(
    @AuthUser() user: User,
    @Args('input') deleteQuestionHighlightInput: DeleteQuestionHighlightInput,
  ) {
    return this.mockExamQuestionHighlightService.deleteQuestionHighlight(
      user,
      deleteQuestionHighlightInput,
    );
  }
}
