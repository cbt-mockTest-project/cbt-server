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
}
