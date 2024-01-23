import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryEvaluation } from './entities/category-evaluation.entity';
import { CategoryEvaluationService } from './category-evaluation.service';
import {
  CreateCategoryEvaluationInput,
  CreateCategoryEvaluationOutput,
} from './dtos/createCategoryEvaluation.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/auth/role.decorators';
import {
  UpdateCategoryEvaluationInput,
  UpdateCategoryEvaluationOutput,
} from './dtos/updateCategoryEvaluation.dto';
import {
  DeleteCategoryEvaluationInput,
  DeleteCategoryEvaluationOutput,
} from './dtos/deleteCategoryEvaluation.dto';
import {
  GetCategoryEvaluationInput,
  GetCategoryEvaluationOutput,
} from './dtos/getCategoryEvaluation.dto';

@Resolver(() => CategoryEvaluation)
export class CategoryEvaluationResolver {
  constructor(
    private readonly categoryEvaluationService: CategoryEvaluationService,
  ) {}

  @Role(['ANY'])
  @Mutation(() => CreateCategoryEvaluationOutput)
  async createCategoryEvaluation(
    @AuthUser() user: User,
    @Args('input') createCategoryEvaluationInput: CreateCategoryEvaluationInput,
  ): Promise<CreateCategoryEvaluationOutput> {
    return this.categoryEvaluationService.createCategoryEvaluation(
      user,
      createCategoryEvaluationInput,
    );
  }

  @Role(['ANY'])
  @Mutation(() => UpdateCategoryEvaluationOutput)
  async updateCategoryEvaluation(
    @AuthUser() user: User,
    @Args('input') updateCategoryEvaluationInput: UpdateCategoryEvaluationInput,
  ) {
    return this.categoryEvaluationService.updateCategoryEvaluation(
      user,
      updateCategoryEvaluationInput,
    );
  }

  @Role(['ANY'])
  @Mutation(() => DeleteCategoryEvaluationOutput)
  async deleteCategoryEvaluation(
    @AuthUser() user: User,
    @Args('input') deleteCategoryEvaluationInput: DeleteCategoryEvaluationInput,
  ) {
    return this.categoryEvaluationService.deleteCategoryEvaluation(
      user,
      deleteCategoryEvaluationInput,
    );
  }

  @Query(() => GetCategoryEvaluationOutput)
  async getCategoryEvaluation(
    @Args('input') getCategoryEvaluationInput: GetCategoryEvaluationInput,
  ) {
    return this.categoryEvaluationService.getCategoryEvaluation(
      getCategoryEvaluationInput,
    );
  }
}
