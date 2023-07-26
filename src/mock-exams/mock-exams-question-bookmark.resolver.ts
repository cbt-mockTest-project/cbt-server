import { User } from 'src/users/entities/user.entity';
import { MockExamQuestionBookmark } from './entities/mock-exam-question-bookmark.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from 'src/auth/role.decorators';
import { AuthUser } from 'src/auth/auth-user.decorator';
import {
  EditMockExamQuestionBookmarkInput,
  EditMockExamQuestionBookmarkOutput,
} from './dtos/editMockExamQuestionBookmark.dto';
import { MockExamQuestionBookmarkSerivce } from './mock-exams-question-bookmark.service';
import {
  ReadMockExamQuestionBookmarkOutput,
  ReadMockExamQuestionBookmarkInput,
} from './dtos/readMockExamQuestionBookmark.dto';
import { ReadExamTitleAndIdOfBookmarkedQuestionOutput } from './dtos/readExamTitleAndIdOfBookmarkedQuestion.dto';
import { CoreOutput } from 'src/common/dtos/output.dto';

@Resolver(() => MockExamQuestionBookmark)
export class MockExamQuestionBookmarkResolver {
  constructor(
    private readonly mockExamQuestionBookmarkSerivce: MockExamQuestionBookmarkSerivce,
  ) {}

  @Mutation(() => EditMockExamQuestionBookmarkOutput)
  @Role(['ANY'])
  async editMockExamQuestionBookmark(
    @Args('input')
    editMockExamQuestionBookmarkInput: EditMockExamQuestionBookmarkInput,
    @AuthUser() user: User,
  ): Promise<EditMockExamQuestionBookmarkOutput> {
    return this.mockExamQuestionBookmarkSerivce.editMockExamQuestionBookmark(
      editMockExamQuestionBookmarkInput,
      user,
    );
  }

  @Query(() => ReadMockExamQuestionBookmarkOutput)
  @Role(['ANY'])
  async readMockExamQuestionBookmark(
    @Args('input')
    readMockExamQuestionBookmarkInput: ReadMockExamQuestionBookmarkInput,
    @AuthUser()
    user: User,
  ): Promise<ReadMockExamQuestionBookmarkOutput> {
    return this.mockExamQuestionBookmarkSerivce.readMockExamQuestionBookmark(
      readMockExamQuestionBookmarkInput,
      user,
    );
  }

  @Query(() => ReadExamTitleAndIdOfBookmarkedQuestionOutput)
  @Role(['ANY'])
  async readExamTitleAndIdOfBookmarkedQuestion(
    @AuthUser()
    user: User,
  ): Promise<ReadExamTitleAndIdOfBookmarkedQuestionOutput> {
    return this.mockExamQuestionBookmarkSerivce.readExamTitleAndIdOfBookmarkedQuestion(
      user,
    );
  }

  @Mutation(() => CoreOutput)
  @Role(['ANY'])
  async resetMyQuestionBookmark(@AuthUser() user: User): Promise<CoreOutput> {
    return this.mockExamQuestionBookmarkSerivce.resetMyQuestionBookmark(user);
  }
}
