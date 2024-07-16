import {
  ReadMyMockExamCategoriesInput,
  ReadMyMockExamCategoriesOutput,
} from './dtos/readMyMockExamCategories.dto';
import { User } from 'src/users/entities/user.entity';
import {
  ReadAllMockExamCategoriesInput,
  ReadAllMockExamCategoriesOutput,
} from './dtos/readAllCategories.dto';
import {
  CreateMockExamCategoryInput,
  CreateMockExamCategoryOutput,
} from './dtos/createCategory.dto';
import { MockExamCategoryService } from './mock-exams-category.service';
import { MockExamCategory } from './entities/mock-exam-category.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from 'src/auth/role.decorators';
import {
  DeleteMockExamCategoryInput,
  DeleteMockExamCategoryOutput,
} from './dtos/deleteCategory.dto';
import {
  EditMockExamCategoryInput,
  EditMockExamCategoryOutput,
} from './dtos/editCategory.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import {
  ReadMockExamCategoryByExamIdInput,
  ReadMockExamCategoryByExamIdOutput,
} from './dtos/readMockExamCategoryByExamId.dto';
import {
  ReadMockExamCategoriesInput,
  ReadMockExamCategoriesOutput,
} from './dtos/readMockExamCategories.dto';
import { ReadMockExamCategoryIdsOutput } from './dtos/readMockExamCategoryIds.dto';
import {
  ReadMockExamCategoryByCategoryIdInput,
  ReadMockExamCategoryByCategoryIdOutput,
} from './dtos/readMockExamCategoryByCategoryId.dto';
import {
  SearchMockExamCategoriesInput,
  SearchMockExamCategoriesOutput,
} from '../exam/dtos/searchMockExamCategories.dto';
import {
  GetExamCategoriesInput,
  GetExamCategoriesOutput,
} from '../exam/dtos/getExamCategories.dto';
import { GetMyExamCategoriesOutput } from '../exam/dtos/getMyExamCategories.dto';
import {
  GetExamCategoryLearningProgressInput,
  GetExamCategoryLearningProgressOutput,
} from './dtos/getExamCategoryLearningProgress.dto';
import { ReadMockExamCategoryNamesOutput } from './dtos/readMockExamCategoryNames.dto';
import { GetMyAllExamCategoriesLearningProgressOutput } from './dtos/getMyAllExamCategoriesLearningProgress.dto';
import {
  MoveExamOrderInput,
  MoveExamOrderOutput,
} from './dtos/moveExamOrder.dto';
import {
  CheckIsAccessibleCategoryInput,
  CheckIsAccessibleCategoryOutput,
} from './dtos/checkIsAccessibleCategory.dto';
import {
  CheckHasCategoryAccessInput,
  CheckHasCategoryAccessOutput,
} from './dtos/checkHasCategoryAccess.dto';

@Resolver(() => MockExamCategory)
export class MockExamCategoryResolver {
  constructor(
    private readonly mockExamCategoryService: MockExamCategoryService,
  ) {}

  @Mutation(() => CreateMockExamCategoryOutput)
  @Role(['ANY'])
  createMockExamCategory(
    @AuthUser() user: User,
    @Args('input') createMockExamCategoryInput: CreateMockExamCategoryInput,
  ): Promise<CreateMockExamCategoryOutput> {
    return this.mockExamCategoryService.createMockExamCategory(
      user,
      createMockExamCategoryInput,
    );
  }

  @Mutation(() => DeleteMockExamCategoryOutput)
  @Role(['ANY'])
  deleteMockExamCategory(
    @AuthUser() user,
    @Args('input') deleteMockExamCategoryInput: DeleteMockExamCategoryInput,
  ): Promise<DeleteMockExamCategoryOutput> {
    return this.mockExamCategoryService.deleteMockExamCategory(
      user,
      deleteMockExamCategoryInput,
    );
  }

  @Mutation(() => DeleteMockExamCategoryOutput)
  @Role(['ANY'])
  editMockExamCategory(
    @AuthUser() user,
    @Args('input') editMockExamCategoryInput: EditMockExamCategoryInput,
  ): Promise<EditMockExamCategoryOutput> {
    return this.mockExamCategoryService.editMockExamCategory(
      user,
      editMockExamCategoryInput,
    );
  }

  @Query(() => ReadAllMockExamCategoriesOutput)
  readAllMockExamCategories(
    @Args('input', { nullable: true })
    readAllMockExamCategoriesInput?: ReadAllMockExamCategoriesInput,
  ): Promise<ReadAllMockExamCategoriesOutput> {
    return this.mockExamCategoryService.readAllMockExamCategories(
      readAllMockExamCategoriesInput,
    );
  }

  @Query(() => ReadMyMockExamCategoriesOutput)
  readMyMockExamCategories(
    @AuthUser() user: User,
    @Args('input', { nullable: true })
    readMyMockExamCategoriesInput?: ReadMyMockExamCategoriesInput,
  ): Promise<ReadMyMockExamCategoriesOutput> {
    console.log(readMyMockExamCategoriesInput);
    return this.mockExamCategoryService.readMyMockExamCategories(
      user,
      readMyMockExamCategoriesInput || {
        type: 'author',
      },
    );
  }

  @Query(() => ReadMockExamCategoryByExamIdOutput)
  readMockExamCategoryByExamId(
    @Args('input')
    readMockExamCategoryByExamIdInput: ReadMockExamCategoryByExamIdInput,
  ): Promise<ReadMockExamCategoryByExamIdOutput> {
    return this.mockExamCategoryService.readMockExamCategoryByExamId(
      readMockExamCategoryByExamIdInput,
    );
  }

  @Query(() => ReadMockExamCategoriesOutput)
  readMockExamCategories(
    @Args('input')
    readMockExamCategoriesInput: ReadMockExamCategoriesInput,
  ): Promise<ReadMockExamCategoriesOutput> {
    return this.mockExamCategoryService.readMockExamCategories(
      readMockExamCategoriesInput,
    );
  }

  @Query(() => ReadMockExamCategoryIdsOutput)
  async readMockExamCategoryIds(): Promise<ReadMockExamCategoryIdsOutput> {
    return this.mockExamCategoryService.readMockExamCategoryIds();
  }

  @Query(() => ReadMockExamCategoryByCategoryIdOutput)
  async readMockExamCategoryByCategoryId(
    @AuthUser() user: User,
    @Args('input')
    readMockExamCategoryByCategoryIdInput: ReadMockExamCategoryByCategoryIdInput,
  ): Promise<ReadMockExamCategoryByCategoryIdOutput> {
    return this.mockExamCategoryService.readMockExamCategoryByCategoryId(
      user,
      readMockExamCategoryByCategoryIdInput,
    );
  }

  @Query(() => SearchMockExamCategoriesOutput)
  async searchMockExamCategories(
    @Args('input') searchMockExamCategoriesInput: SearchMockExamCategoriesInput,
  ): Promise<SearchMockExamCategoriesOutput> {
    return this.mockExamCategoryService.searchMockExamCategories(
      searchMockExamCategoriesInput,
    );
  }

  @Query(() => GetExamCategoriesOutput)
  async getExamCategories(
    @AuthUser() user: User,
    @Args('input') getExamCategoriesInput: GetExamCategoriesInput,
  ): Promise<GetExamCategoriesOutput> {
    return this.mockExamCategoryService.getExamCategories(
      getExamCategoriesInput,
      user,
    );
  }

  @Role(['ANY'])
  @Query(() => GetMyExamCategoriesOutput)
  async getMyExamCategories(
    @AuthUser() user: User,
  ): Promise<GetMyExamCategoriesOutput> {
    return this.mockExamCategoryService.getMyExamCategories(user);
  }

  @Role(['ANY'])
  @Query(() => GetExamCategoryLearningProgressOutput)
  async getExamCategoryLearningProgress(
    @AuthUser() user: User,
    @Args('input')
    getExamCategoryLearningProgressInput: GetExamCategoryLearningProgressInput,
  ): Promise<GetExamCategoryLearningProgressOutput> {
    return this.mockExamCategoryService.getExamCategoryLearningProgress(
      user,
      getExamCategoryLearningProgressInput,
    );
  }

  @Role(['ANY'])
  @Query(() => GetMyAllExamCategoriesLearningProgressOutput)
  async getMyAllExamCategoriesLearningProgress(
    @AuthUser() user: User,
  ): Promise<GetMyAllExamCategoriesLearningProgressOutput> {
    return this.mockExamCategoryService.getMyAllExamCategoriesLearningProgress(
      user,
    );
  }

  @Query(() => ReadMockExamCategoryNamesOutput)
  async readMockExamCategoryNames(): Promise<ReadMockExamCategoryNamesOutput> {
    return this.mockExamCategoryService.readMockExamCategoryNames();
  }

  @Mutation(() => MoveExamOrderOutput)
  @Role(['ANY'])
  async moveExamOrder(
    @AuthUser() user: User,
    @Args('input')
    moveExamOrderInput: MoveExamOrderInput,
  ): Promise<MoveExamOrderOutput> {
    return this.mockExamCategoryService.moveExamOrder(user, moveExamOrderInput);
  }

  @Mutation(() => CheckIsAccessibleCategoryOutput)
  async checkIsAccessibleCategory(
    @AuthUser() user: User,
    @Args('input')
    checkIsAccessibleCategoryInput: CheckIsAccessibleCategoryInput,
  ): Promise<CheckIsAccessibleCategoryOutput> {
    return this.mockExamCategoryService.checkIsAccessibleCategory(
      user,
      checkIsAccessibleCategoryInput,
    );
  }

  @Mutation(() => CheckHasCategoryAccessOutput)
  async checkHasCategoryAccess(
    @AuthUser() user: User,
    @Args('input')
    checkHasCategoryAccessInput: CheckHasCategoryAccessInput,
  ): Promise<CheckHasCategoryAccessOutput> {
    return this.mockExamCategoryService.checkHasCategoryAccess(
      user,
      checkHasCategoryAccessInput,
    );
  }

  @Role(['ADMIN'])
  @Query(() => GetExamCategoriesOutput)
  async getExamCategoriesForAdmin(): Promise<GetExamCategoriesOutput> {
    return this.mockExamCategoryService.getExamCategoriesForAdmin();
  }
}
