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
  ): Promise<CreateMockExamQuestionFeedbackOutput> {
    return this.mockExamQuestionFeedbackSerivce.createMockExamQuestionFeedback(
      createMockExamQuestionFeedbackInput,
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
  @Role(['ADMIN'])
  async deleteMockExamQuestionFeedback(
    @Args('input')
    deleteMockExamQuestionFeedbackInput: DeleteMockExamQuestionFeedbackInput,
  ): Promise<DeleteMockExamQuestionFeedbackOutput> {
    return this.mockExamQuestionFeedbackSerivce.deleteMockExamQuestionFeedback(
      deleteMockExamQuestionFeedbackInput,
    );
  }

  @Query(() => ReadAllMockExamQuestionFeedbackOutput)
  async readAllMockExamQuestionFeedback(): Promise<ReadAllMockExamQuestionFeedbackOutput> {
    return this.mockExamQuestionFeedbackSerivce.readAllMockExamQuestionFeedback();
  }
}
