import {
  ReadMyQuestionCommentsOutput,
  ReadMyQuestionCommentsInput,
} from './dtos/readMyQuestionComments.dto';
import {
  ReadMockExamQuestionCommentsByQuestionIdOutput,
  ReadMockExamQuestionCommentsByQuestionIdInput,
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
import { ReadExamTitleAndIdByQuestionCommentOutput } from './dtos/readExamTitleAndIdByQuestionComment.dto';

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

  @Query(() => ReadMockExamQuestionCommentsByQuestionIdOutput)
  async readMockExamQuestionCommentsByQuestionId(
    @Args('input')
    readMockExamQuestionCommentsByQuestionIdInput: ReadMockExamQuestionCommentsByQuestionIdInput,
    @AuthUser() user: User,
  ): Promise<ReadMockExamQuestionCommentsByQuestionIdOutput> {
    return this.mockExamQuestionCommentSerivce.readMockExamQuestionCommentsByQuestionId(
      readMockExamQuestionCommentsByQuestionIdInput,
      user,
    );
  }

  @Query(() => ReadMyQuestionCommentsOutput)
  @Role(['ANY'])
  async readMyQuestionComments(
    @Args('input') readMyQuestionCommentsInput: ReadMyQuestionCommentsInput,
    @AuthUser() user: User,
  ): Promise<ReadMyQuestionCommentsOutput> {
    return this.mockExamQuestionCommentSerivce.readMyQuestionComments(
      readMyQuestionCommentsInput,
      user,
    );
  }

  @Query(() => ReadExamTitleAndIdByQuestionCommentOutput)
  @Role(['ANY'])
  async readExamTitleAndIdByQuestionComment(
    @AuthUser() user: User,
  ): Promise<ReadExamTitleAndIdByQuestionCommentOutput> {
    return this.mockExamQuestionCommentSerivce.readExamTitleAndIdByQuestionComment(
      user,
    );
  }
}
