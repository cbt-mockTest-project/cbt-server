import {
  CreateMockExamQuestionMultipleChoiceInput,
  CreateMockExamQuestionMultipleChoiceOutput,
} from './dtos/createMockExamQuestionMultipleChoice.dto';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MockExamQuestionMultipleChoice } from './entities/mock-exam-question-multiple-choice.entity';
import { MockExamQuestionMultipleChoiceService } from './mock-exams-question-multiple-choice.service';
import { Role } from 'src/auth/role.decorators';

@Resolver(() => MockExamQuestionMultipleChoice)
export class MockExamQuestionMultipleChoiceResolver {
  constructor(
    private readonly mockExamQuestionMultipleChoiceService: MockExamQuestionMultipleChoiceService,
  ) {}

  @Role(['ADMIN'])
  @Mutation(() => CreateMockExamQuestionMultipleChoiceOutput)
  async createMutipleChoice(
    @Args('input')
    createMockExamQuestionMultipleChoiceInput: CreateMockExamQuestionMultipleChoiceInput,
  ): Promise<CreateMockExamQuestionMultipleChoiceOutput> {
    return this.mockExamQuestionMultipleChoiceService.createMutipleChoice(
      createMockExamQuestionMultipleChoiceInput,
    );
  }
}
