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
import {
  MoveQuestionBookmarkInput,
  moveQuestionBookmarkOutput,
} from './dtos/question-bookmark/moveQuestionBookmark.dto';
import {
  CreateQuestionBookmarkInput,
  CreateQuestionBookmarkOutput,
} from './dtos/question-bookmark/createQuestionBookmark.dto';
import {
  DeleteQuestionBookmarkInput,
  DeleteQuestionBookmarkOutput,
} from './dtos/question-bookmark/deleteQuestionBookmark.dto';
import {
  ResetMyQuestionBookmarksInput,
  ResetMyQuestionBookmarksOutput,
} from './dtos/question-bookmark/resetMyQuestionBookmarks.dto';
import {
  ResetQuestionBookmarkInput,
  ResetQuestionBookmarkOutput,
} from './dtos/resetQuestionBookmark.dto';

@Resolver(() => MockExamQuestionBookmark)
export class MockExamQuestionBookmarkResolver {
  constructor(
    private readonly mockExamQuestionBookmarkSerivce: MockExamQuestionBookmarkSerivce,
  ) {}
  /** deprecated: 폴더 api 적용후 */
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
  /** deprecated: 폴더 api 적용후 */
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
  /** deprecated: 폴더 api 적용후 */
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
  /** deprecated: 폴더 api 적용후 */
  @Mutation(() => CoreOutput)
  @Role(['ANY'])
  async resetMyQuestionBookmark(@AuthUser() user: User): Promise<CoreOutput> {
    return this.mockExamQuestionBookmarkSerivce.resetMyQuestionBookmark(user);
  }

  @Mutation(() => moveQuestionBookmarkOutput)
  @Role(['ANY'])
  async moveQuestionBookmark(
    @Args('input')
    moveQuestionBookmarkInput: MoveQuestionBookmarkInput,
    @AuthUser() user: User,
  ): Promise<moveQuestionBookmarkOutput> {
    return this.mockExamQuestionBookmarkSerivce.moveQuestionBookmark(
      moveQuestionBookmarkInput,
      user,
    );
  }

  @Mutation(() => CreateQuestionBookmarkOutput)
  @Role(['ANY'])
  async createQuestionBookmark(
    @Args('input')
    createQuestionBookmarkInput: CreateQuestionBookmarkInput,
    @AuthUser() user: User,
  ): Promise<CreateQuestionBookmarkOutput> {
    return this.mockExamQuestionBookmarkSerivce.createQuestionBookmark(
      createQuestionBookmarkInput,
      user,
    );
  }

  @Mutation(() => DeleteQuestionBookmarkOutput)
  @Role(['ANY'])
  async deleteQuestionBookmark(
    @Args('input')
    deleteQuestionBookmarkInput: DeleteQuestionBookmarkInput,
    @AuthUser() user: User,
  ): Promise<DeleteQuestionBookmarkOutput> {
    return this.mockExamQuestionBookmarkSerivce.deleteQuestionBookmark(
      deleteQuestionBookmarkInput,
      user,
    );
  }

  @Mutation(() => ResetMyQuestionBookmarksOutput)
  @Role(['ANY'])
  async resetMyQuestionBookmarks(
    @Args('input')
    resetMyQuestionBookmarksInput: ResetMyQuestionBookmarksInput,
    @AuthUser() user: User,
  ): Promise<ResetMyQuestionBookmarksOutput> {
    return this.mockExamQuestionBookmarkSerivce.resetMyQuestionBookmarks(
      resetMyQuestionBookmarksInput,
      user,
    );
  }

  @Mutation(() => ResetQuestionBookmarkOutput)
  @Role(['ANY'])
  async resetQuestionBookmark(
    @Args('input')
    resetQuestionBookmarkInput: ResetQuestionBookmarkInput,
    @AuthUser() user: User,
  ): Promise<ResetQuestionBookmarkOutput> {
    return this.mockExamQuestionBookmarkSerivce.resetQuestionBookmark(
      resetQuestionBookmarkInput,
      user,
    );
  }
}
