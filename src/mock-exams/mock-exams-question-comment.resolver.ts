import {
  ReadMockExamQuestionCommentsByQuestinIdOutput,
  ReadMockExamQuestionCommentsByQuestinIdInput,
} from './dtos/readMockExamQuestionCommentsByQuestinId.dto';
import { User } from 'src/users/entities/user.entity';
import {
  DeleteMockExamQuestionCommentInput,
  DeleteMockExamQuestionCommentOutput,
} from './dtos/deleteMockExamQuestionComment.dto';
import { MockExamQuestionComment } from './entities/mock-exam-question-comment.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MockExamQuestionCommentSerivce } from './mock-exams-question-comment.service';
import { Role } from 'src/auth/role.decorators';
import {
  CreateMockExamQuestionCommentInput,
  CreateMockExamQuestionCommentOutput,
} from './dtos/createMockExamQuestionComment.dto';
import {
  EditMockExamQuestionCommentInput,
  EditMockExamQuestionCommentOutput,
} from './dtos/editMockExamQuestionComment.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';

@Resolver(() => MockExamQuestionComment)
export class MockExamQuestionCommentResolver {
  constructor(
    private readonly mockExamQuestionCommentSerivce: MockExamQuestionCommentSerivce,
  ) {}

  @Mutation(() => CreateMockExamQuestionCommentOutput)
  @Role(['ANY'])
  createMockExamQuestionComment(
    @Args('input')
    createMockExamQuestionCommentInput: CreateMockExamQuestionCommentInput,
    @AuthUser() user: User,
  ): Promise<CreateMockExamQuestionCommentOutput> {
    return this.mockExamQuestionCommentSerivce.createMockExamQuestionComment(
      createMockExamQuestionCommentInput,
      user,
    );
  }

  @Mutation(() => EditMockExamQuestionCommentOutput)
  @Role(['ANY'])
  async editMockExamQuestionComment(
    @Args('input')
    editMockExamQuestionCommentInput: EditMockExamQuestionCommentInput,
    @AuthUser() user: User,
  ): Promise<EditMockExamQuestionCommentOutput> {
    return this.mockExamQuestionCommentSerivce.editMockExamQuestionComment(
      editMockExamQuestionCommentInput,
      user,
    );
  }

  @Mutation(() => DeleteMockExamQuestionCommentOutput)
  @Role(['ANY'])
  async deleteMockExamQuestionComment(
    @Args('input')
    deleteMockExamQuestionCommentInput: DeleteMockExamQuestionCommentInput,
    @AuthUser() user: User,
  ): Promise<DeleteMockExamQuestionCommentOutput> {
    return this.mockExamQuestionCommentSerivce.deleteMockExamQuestionComment(
      deleteMockExamQuestionCommentInput,
      user,
    );
  }

  @Query(() => ReadMockExamQuestionCommentsByQuestinIdOutput)
  async readMockExamQuestionCommentsByQuestinId(
    @Args('input')
    readMockExamQuestionCommentsByQuestinIdInput: ReadMockExamQuestionCommentsByQuestinIdInput,
    @AuthUser() user: User,
  ): Promise<ReadMockExamQuestionCommentsByQuestinIdOutput> {
    return this.mockExamQuestionCommentSerivce.readMockExamQuestionCommentsByQuestinoId(
      readMockExamQuestionCommentsByQuestinIdInput,
      user,
    );
  }
}
