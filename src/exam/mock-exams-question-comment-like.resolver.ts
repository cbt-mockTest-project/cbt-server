import {
  ReadMockExamQuestionCommentLikesByQuestinIdOutput,
  ReadMockExamQuestionCommentLikesByQuestinIdInput,
} from './dtos/readMockExamQuestionCommentLikesByQuestinId.dto';
import { User } from 'src/users/entities/user.entity';

import { MockExamQuestionCommentLike } from './entities/mock-exam-question-comment-like.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MockExamQuestionCommentLikeSerivce } from './mock-exams-question-comment-like.service';
import { Role } from 'src/auth/role.decorators';
import { AuthUser } from 'src/auth/auth-user.decorator';
import {
  EditMockExamQuestionCommentLikeInput,
  EditMockExamQuestionCommentLikeOutput,
} from './dtos/editMockExamQuestionCommentLike.dto';

@Resolver(() => MockExamQuestionCommentLike)
export class MockExamQuestionCommentLikeResolver {
  constructor(
    private readonly mockExamQuestionCommentLikeSerivce: MockExamQuestionCommentLikeSerivce,
  ) {}

  @Mutation(() => EditMockExamQuestionCommentLikeOutput)
  @Role(['ANY'])
  async editMockExamQuestionCommentLike(
    @Args('input')
    editMockExamQuestionCommentLikeInput: EditMockExamQuestionCommentLikeInput,
    @AuthUser() user: User,
  ): Promise<EditMockExamQuestionCommentLikeOutput> {
    return this.mockExamQuestionCommentLikeSerivce.editMockExamQuestionCommentLike(
      editMockExamQuestionCommentLikeInput,
      user,
    );
  }

  @Query(() => ReadMockExamQuestionCommentLikesByQuestinIdOutput)
  async readMockExamQuestionCommentLikesByQuestinId(
    @Args('input')
    readMockExamQuestionCommentLikesByQuestinIdInput: ReadMockExamQuestionCommentLikesByQuestinIdInput,
  ): Promise<ReadMockExamQuestionCommentLikesByQuestinIdOutput> {
    return this.mockExamQuestionCommentLikeSerivce.readMockExamQuestionCommentLikesByQuestinId(
      readMockExamQuestionCommentLikesByQuestinIdInput,
    );
  }
}
