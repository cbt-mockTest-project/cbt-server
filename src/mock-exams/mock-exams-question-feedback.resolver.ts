import { User } from 'src/users/entities/user.entity';
import {
  DeleteMockExamQuestionFeedbackInput,
  DeleteMockExamQuestionFeedbackOutput,
} from './dtos/deleteMockExamQuestionFeedback.dto';
import { MockExamQuestionFeedback } from './entities/mock-exam-question-feedback.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MockExamQuestionFeedbackSerivce } from './mock-exams-question-feedback.service';
import { Role } from 'src/auth/role.decorators';
import {
  CreateMockExamQuestionFeedbackInput,
  CreateMockExamQuestionFeedbackOutput,
} from './dtos/createMockExamQuestionFeedback.dto';
import {
  EditMockExamQuestionFeedbackInput,
  EditMockExamQuestionFeedbackOutput,
} from './dtos/editMockExamQuestionFeedback.dto';
import { ReadAllMockExamQuestionFeedbackOutput } from './dtos/readAllMockExamQuestionFeedback.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { GetExamTitleWithFeedbackOutput } from './dtos/getExamTitleWithFeedback.dto';
import {
  GetFeedbacksWithFilterInput,
  GetFeedbacksWithFilterOutput,
} from './dtos/getFeedbacksWithFilter.dto';

@Resolver(() => MockExamQuestionFeedback)
export class MockExamQuestionFeedbackResolver {
  constructor(
    private readonly mockExamQuestionFeedbackSerivce: MockExamQuestionFeedbackSerivce,
  ) {}

  @Mutation(() => CreateMockExamQuestionFeedbackOutput)
  @Role(['ANY'])
  createMockExamQuestionFeedback(
    @Args('input')
    createMockExamQuestionFeedbackInput: CreateMockExamQuestionFeedbackInput,
    @AuthUser() user: User,
  ): Promise<CreateMockExamQuestionFeedbackOutput> {
    return this.mockExamQuestionFeedbackSerivce.createMockExamQuestionFeedback(
      createMockExamQuestionFeedbackInput,
      user,
    );
  }

  @Mutation(() => EditMockExamQuestionFeedbackOutput)
  @Role(['ADMIN'])
  async editMockExamQuestionFeedback(
    @Args('input')
    editMockExamQuestionFeedbackInput: EditMockExamQuestionFeedbackInput,
  ): Promise<EditMockExamQuestionFeedbackOutput> {
    return this.mockExamQuestionFeedbackSerivce.editMockExamQuestionFeedback(
      editMockExamQuestionFeedbackInput,
    );
  }

  @Mutation(() => DeleteMockExamQuestionFeedbackOutput)
  @Role(['ANY'])
  async deleteMockExamQuestionFeedback(
    @AuthUser() user: User,
    @Args('input')
    deleteMockExamQuestionFeedbackInput: DeleteMockExamQuestionFeedbackInput,
  ): Promise<DeleteMockExamQuestionFeedbackOutput> {
    return this.mockExamQuestionFeedbackSerivce.deleteMockExamQuestionFeedback(
      user,
      deleteMockExamQuestionFeedbackInput,
    );
  }

  @Query(() => ReadAllMockExamQuestionFeedbackOutput)
  async readAllMockExamQuestionFeedback(): Promise<ReadAllMockExamQuestionFeedbackOutput> {
    return this.mockExamQuestionFeedbackSerivce.readAllMockExamQuestionFeedback();
  }

  @Query(() => GetExamTitleWithFeedbackOutput)
  async getExamTitleWithFeedback(
    @AuthUser() user: User,
  ): Promise<GetExamTitleWithFeedbackOutput> {
    return this.mockExamQuestionFeedbackSerivce.getExamTitleWithFeedback(user);
  }

  @Query(() => GetFeedbacksWithFilterOutput)
  async getFeedbacksWithFilter(
    @Args('input')
    getFeedbacksWithFilterInput: GetFeedbacksWithFilterInput,
    @AuthUser() user: User,
  ): Promise<GetFeedbacksWithFilterOutput> {
    return this.mockExamQuestionFeedbackSerivce.getFeedbacksWithFilter(
      getFeedbacksWithFilterInput,
      user,
    );
  }
}
