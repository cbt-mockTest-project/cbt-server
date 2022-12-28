import {
  ResetMyExamQuestionStateInput,
  ResetMyExamQuestionStateOutput,
} from './dtos/resetMyExamQuestionState.dto';
import { User } from 'src/users/entities/user.entity';
import {
  CreateOrUpdateMockExamQuestionStateOutput,
  CreateOrUpdateMockExamQuestionStateInput,
} from './dtos/createOrUpdateMockExamQuestionState.dto';
import { MockExamQuestionStateService } from './mock-exams-question-state.service';
import { MockExamQuestionState } from 'src/mock-exams/entities/mock-exam-question-state.entity';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Role } from 'src/auth/role.decorators';
import { AuthUser } from 'src/auth/auth-user.decorator';
import {
  ReadMyExamQuestionStateInput,
  ReadMyExamQuestionStateOutput,
} from './dtos/readMyExamQuestionStates.dto';

@Resolver(() => MockExamQuestionState)
export class MockExamQuestionStateResolver {
  constructor(
    private readonly mockExamQuestionStateService: MockExamQuestionStateService,
  ) {}

  @Mutation(() => CreateOrUpdateMockExamQuestionStateOutput)
  @Role(['ANY'])
  async createOrUpdateMockExamQuestionState(
    @AuthUser() user: User,
    @Args('input')
    createOrUpdateMockExamQuestionStateInput: CreateOrUpdateMockExamQuestionStateInput,
  ): Promise<CreateOrUpdateMockExamQuestionStateOutput> {
    return this.mockExamQuestionStateService.createOrUpdateMockExamQuestionState(
      user,
      createOrUpdateMockExamQuestionStateInput,
    );
  }

  @Mutation(() => ResetMyExamQuestionStateOutput)
  @Role(['ANY'])
  async resetMyExamQuestionState(
    @Args('input') resetMyExamQuestionStateInput: ResetMyExamQuestionStateInput,
    @AuthUser() user: User,
  ): Promise<ResetMyExamQuestionStateOutput> {
    return this.mockExamQuestionStateService.resetMyExamQuestionState(
      resetMyExamQuestionStateInput,
      user,
    );
  }

  @Query(() => ReadMyExamQuestionStateOutput)
  async readMyExamQuestionState(
    @Args('input') readMyExamQuestionState: ReadMyExamQuestionStateInput,
    @AuthUser() user: User,
  ): Promise<ReadMyExamQuestionStateOutput> {
    return this.mockExamQuestionStateService.readMyExamQuestionState(
      readMyExamQuestionState,
      user,
    );
  }
}
