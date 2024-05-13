import { Args, Query, Resolver } from '@nestjs/graphql';
import { CategoryPointHistory } from './entities/category-point-history.entity';
import { CategoryPointHistoryService } from './category-point-history.service';
import {
  GetCategoryPointHistoriesInput,
  GetCategoryPointHistoriesOutput,
} from './dtos/category-point-history/get-category-point-histories.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/auth/role.decorators';

@Resolver(() => CategoryPointHistory)
export class CategoryPointHistoryResolver {
  constructor(
    private readonly categoryPointHistoryService: CategoryPointHistoryService,
  ) {}

  @Query(() => GetCategoryPointHistoriesOutput)
  @Role(['ANY'])
  async getCategoryPointHistories(
    @AuthUser() user: User,
    @Args('input')
    getCategoryPointHistoriesInput: GetCategoryPointHistoriesInput,
  ): Promise<GetCategoryPointHistoriesOutput> {
    return this.categoryPointHistoryService.getCategoryPointHistories(
      user,
      getCategoryPointHistoriesInput,
    );
  }
}
