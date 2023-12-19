import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorators';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExamQuestionState } from 'src/exam/entities/mock-exam-question-state.entity';
import { User } from 'src/users/entities/user.entity';
import {
  CreateOrUpdateMockExamQuestionStateInput,
  CreateOrUpdateMockExamQuestionStateOutput,
} from './dtos/createOrUpdateMockExamQuestionState.dto';
import { ReadExamTitleAndIdByQuestionStateOutput } from './dtos/readExamTitleAndIdByQuestionState.dto';
import {
  ReadMyExamQuestionStateInput,
  ReadMyExamQuestionStateOutput,
} from './dtos/readMyExamQuestionStates.dto';
import {
  ResetMyExamQuestionStateInput,
  ResetMyExamQuestionStateOutput,
} from './dtos/resetMyExamQuestionState.dto';
import { MockExamQuestionStateService } from './mock-exams-question-state.service';

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

  @Query(() => ReadExamTitleAndIdByQuestionStateOutput)
  @Role(['ANY'])
  async readExamTitleAndIdByQuestionState(
    @AuthUser() user: User,
  ): Promise<ReadExamTitleAndIdByQuestionStateOutput> {
    return this.mockExamQuestionStateService.readExamTitleAndIdByQuestionState(
      user,
    );
  }

  @Mutation(() => CoreOutput)
  @Role(['ANY'])
  async updateQuestionStatesToCore(
    @AuthUser() user: User,
  ): Promise<CoreOutput> {
    return this.mockExamQuestionStateService.updateQuestionStatesToCore(user);
  }

  @Mutation(() => CoreOutput)
  @Role(['ANY'])
  async restMyAllQuestionStates(@AuthUser() user: User): Promise<CoreOutput> {
    return this.mockExamQuestionStateService.restMyAllQuestionStates(user);
  }
}
