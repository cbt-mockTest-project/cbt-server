import { User } from 'src/users/entities/user.entity';
import { ReadAllMockExamQuestionOutput } from './dtos/readAllMockExamQuestion.dto';
import {
  CreateMockExamQuestionInput,
  CreateMockExamQuestionOutput,
} from './dtos/createMockExamQuestion.dto';
import { MockExamQuestion } from './entities/mock-exam-question.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MockExamQuestionService } from './mock-exams-question.service';
import { Role } from 'src/auth/role.decorators';
import {
  EditMockExamQuestionOutput,
  EditMockExamQuestionInput,
} from './dtos/editMockExamQuestion.dto';
import {
  DeleteMockExamQuestionInput,
  DeleteMockExamQuestionOutput,
} from './dtos/deleteMockExamQuestion.dto';
import {
  CreateOrUpdateMockExamQuestionStateInput,
  CreateOrUpdateMockExamQuestionStateOutput,
} from './dtos/createOrUpdateMockExamQuestionState.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';

@Resolver(() => MockExamQuestion)
export class MockExamQuestionResolver {
  constructor(
    private readonly mockExamQuestionService: MockExamQuestionService,
  ) {}

  @Mutation(() => CreateMockExamQuestionOutput)
  @Role(['ADMIN'])
  createMockExamQuestion(
    @Args('input') createMockExamQuestionInput: CreateMockExamQuestionInput,
  ) {
    return this.mockExamQuestionService.createMockExamQuestion(
      createMockExamQuestionInput,
    );
  }

  @Mutation(() => EditMockExamQuestionOutput)
  @Role(['ADMIN'])
  editMockExamQuestion(
    @Args('input') editMockExamQuestionInput: EditMockExamQuestionInput,
  ): Promise<EditMockExamQuestionOutput> {
    return this.mockExamQuestionService.editMockExamQuestion(
      editMockExamQuestionInput,
    );
  }

  @Mutation(() => DeleteMockExamQuestionOutput)
  @Role(['ADMIN'])
  deleteMockExamQuestion(
    @Args('input') deleteMockExamQuestionInput: DeleteMockExamQuestionInput,
  ): Promise<DeleteMockExamQuestionOutput> {
    return this.mockExamQuestionService.deleteMockExamQuestion(
      deleteMockExamQuestionInput,
    );
  }

  @Query(() => ReadAllMockExamQuestionOutput)
  readAllMockExamQuestion(): Promise<ReadAllMockExamQuestionOutput> {
    return this.mockExamQuestionService.readAllMockExamQuestion();
  }

  @Mutation(() => CreateOrUpdateMockExamQuestionStateOutput)
  @Role(['ANY'])
  async createOrUpdateMockExamQuestionState(
    @AuthUser() user: User,
    @Args('input')
    createOrUpdateMockExamQuestionStateInput: CreateOrUpdateMockExamQuestionStateInput,
  ): Promise<CreateOrUpdateMockExamQuestionStateOutput> {
    return this.mockExamQuestionService.createOrUpdateMockExamQuestionState(
      user,
      createOrUpdateMockExamQuestionStateInput,
    );
  }
}
