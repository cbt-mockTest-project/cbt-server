import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ExamCategoryBookmarkService } from './exam-category-bookmark.service';
import { Role } from 'src/auth/role.decorators';
import { GetMyBookmarkedExamCategoriesOutput } from './dtos/getMyBookmarkedExamCategories.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { ExamCategoryBookmark } from './entities/exam-category-bookmark';
import {
  ToggleExamCategoryBookmarkInput,
  ToggleExamCategoryBookmarkOutput,
} from './dtos/toggleExamCategoryBookmark.dto';
import {
  DeleteExamCategoryBookmarkInput,
  DeleteExamCategoryBookmarkOutput,
} from './dtos/deleteExamCategoryBookmark';
import {
  GetExamCategorySubscribersInput,
  GetExamCategorySubscribersOutput,
} from './dtos/getExamCategorySubscribers.dto';

@Resolver(() => ExamCategoryBookmark)
export class ExamCategoryBookmarkResolver {
  constructor(
    private readonly examCategoryBookmarkService: ExamCategoryBookmarkService,
  ) {}

  @Role(['ANY'])
  @Query(() => GetMyBookmarkedExamCategoriesOutput)
  getMyBookmarkedExamCategories(
    @AuthUser() user: User,
  ): Promise<GetMyBookmarkedExamCategoriesOutput> {
    return this.examCategoryBookmarkService.getMyBookmarkedExamCategories(user);
  }

  @Role(['ANY'])
  @Mutation(() => ToggleExamCategoryBookmarkOutput)
  toggleExamCategorieBookmark(
    @AuthUser() user: User,
    @Args('input')
    toggleExamCategorieBookmarkInput: ToggleExamCategoryBookmarkInput,
  ): Promise<ToggleExamCategoryBookmarkOutput> {
    return this.examCategoryBookmarkService.toggleExamCategoryBookmark(
      user,
      toggleExamCategorieBookmarkInput,
    );
  }

  @Role(['ANY'])
  @Mutation(() => DeleteExamCategoryBookmarkOutput)
  deleteExamCategoryBookmark(
    @AuthUser() user: User,
    @Args('input')
    deleteExamCategoryBookmarkInput: DeleteExamCategoryBookmarkInput,
  ): Promise<DeleteExamCategoryBookmarkOutput> {
    return this.examCategoryBookmarkService.deleteExamCategoryBookmark(
      user,
      deleteExamCategoryBookmarkInput,
    );
  }

  @Role(['ANY'])
  @Query(() => GetExamCategorySubscribersOutput)
  getExamCategorySubscribers(
    @AuthUser() user: User,
    @Args('input')
    getExamCategorySubscribersInput: GetExamCategorySubscribersInput,
  ): Promise<GetExamCategorySubscribersOutput> {
    return this.examCategoryBookmarkService.getExamCategorySubscribers(
      user,
      getExamCategorySubscribersInput,
    );
  }
}
