import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MockExamBookmark } from './entities/mock-exam-bookmark.entity';
import { MockExamBookmarkService } from './mock-exam-bookmark.service';
import { Role } from 'src/auth/role.decorators';
import { GetMyBookmarkedExamsOutput } from './dtos/getMyBookmarkedExams.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import {
  ToggleExamBookmarkInput,
  ToggleExamBookmarkOutput,
} from './dtos/toggleExamBookmark.dto';

@Resolver(() => MockExamBookmark)
export class MockExamBookmarkResolver {
  constructor(
    private readonly mockExamBookmarkService: MockExamBookmarkService,
  ) {}

  @Role(['ANY'])
  @Query(() => GetMyBookmarkedExamsOutput)
  getMyBookmarkedExams(
    @AuthUser() user: User,
  ): Promise<GetMyBookmarkedExamsOutput> {
    return this.mockExamBookmarkService.getMyBookmarkedExams(user);
  }

  @Role(['ANY'])
  @Mutation(() => ToggleExamBookmarkOutput)
  toggleExamBookmark(
    @AuthUser() user: User,
    @Args('input') toggleExamBookmarkInput: ToggleExamBookmarkInput,
  ): Promise<ToggleExamBookmarkOutput> {
    return this.mockExamBookmarkService.toggleExamBookmark(
      user,
      toggleExamBookmarkInput,
    );
  }
}
