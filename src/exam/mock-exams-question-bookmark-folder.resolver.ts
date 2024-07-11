import { MockExamQuestionBookmark } from './entities/mock-exam-question-bookmark.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MockExamQuestionBookmarkFolderSerivce } from './mock-exams-question-bookmark-folder.service';
import {
  CreateQuestionBookmarkFolderInput,
  CreateQuestionBookmarkFolderOutput,
} from './dtos/question-bookmark-folder/create-question-bookmark-folder.dto';
import { Role } from 'src/auth/role.decorators';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  DeleteQuestionBookmarkFolderInput,
  DeleteQuestionBookmarkFolderOutput,
} from './dtos/question-bookmark-folder/delete-question-bookmark-folder.dto';
import {
  UpdateQuestionBookmarkFolderInput,
  UpdateQuestionBookmarkFolderOutput,
} from './dtos/question-bookmark-folder/update-question-bookmark-folder.dto';
import { ReadQuestionBookmarkFoldersOutput } from './dtos/question-bookmark-folder/read-question-bookmark-folders.dto';

@Resolver(() => MockExamQuestionBookmark)
export class MockExamQuestionBookmarkFolderResolver {
  constructor(
    private readonly mockExamQuestionBookmarkFolderSerivce: MockExamQuestionBookmarkFolderSerivce,
  ) {}

  @Role(['ANY'])
  @Mutation(() => CreateQuestionBookmarkFolderOutput)
  createQuestionBookmarkFolder(
    @Args('input')
    createQuestionBookmarkFolderInput: CreateQuestionBookmarkFolderInput,
    @AuthUser() user: User,
  ): Promise<CreateQuestionBookmarkFolderOutput> {
    return this.mockExamQuestionBookmarkFolderSerivce.createQuestionBookmarkFolder(
      createQuestionBookmarkFolderInput,
      user,
    );
  }

  @Role(['ANY'])
  @Mutation(() => DeleteQuestionBookmarkFolderOutput)
  deleteQuestionBookmarkFolder(
    @Args('input')
    deleteQuestionBookmarkFolderInput: DeleteQuestionBookmarkFolderInput,
    @AuthUser() user: User,
  ): Promise<DeleteQuestionBookmarkFolderOutput> {
    return this.mockExamQuestionBookmarkFolderSerivce.deleteQuestionBookmarkFolder(
      deleteQuestionBookmarkFolderInput,
      user,
    );
  }

  @Role(['ANY'])
  @Mutation(() => UpdateQuestionBookmarkFolderOutput)
  updateQuestionBookmarkFolder(
    @Args('input')
    updateQuestionBookmarkFolderInput: UpdateQuestionBookmarkFolderInput,
    @AuthUser() user: User,
  ): Promise<UpdateQuestionBookmarkFolderOutput> {
    return this.mockExamQuestionBookmarkFolderSerivce.updateQuestionBookmarkFolder(
      updateQuestionBookmarkFolderInput,
      user,
    );
  }

  @Role(['ANY'])
  @Query(() => ReadQuestionBookmarkFoldersOutput)
  readQuestionBookmarkFolders(
    @AuthUser()
    user: User,
  ): Promise<ReadQuestionBookmarkFoldersOutput> {
    return this.mockExamQuestionBookmarkFolderSerivce.readQuestionBookmarkFolders(
      user,
    );
  }
}
