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
}
