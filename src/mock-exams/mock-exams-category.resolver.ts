import { ReadAllMockExamCategoriesOutput } from './dtos/readAllCategories.dto';
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

@Resolver(() => MockExamCategory)
export class MockExamCategoryResolver {
  constructor(
    private readonly mockExamCategoryService: MockExamCategoryService,
  ) {}

  @Mutation(() => CreateMockExamCategoryOutput)
  @Role(['ADMIN'])
  createMockExamCategory(
    @Args('input') createMockExamCategoryInput: CreateMockExamCategoryInput,
  ): Promise<CreateMockExamCategoryOutput> {
    return this.mockExamCategoryService.createMockExamCategory(
      createMockExamCategoryInput,
    );
  }

  @Mutation(() => DeleteMockExamCategoryOutput)
  @Role(['ADMIN'])
  deleteMockExamCategory(
    @Args('input') deleteMockExamCategoryInput: DeleteMockExamCategoryInput,
  ): Promise<DeleteMockExamCategoryOutput> {
    return this.mockExamCategoryService.deleteMockExamCategory(
      deleteMockExamCategoryInput,
    );
  }

  @Mutation(() => DeleteMockExamCategoryOutput)
  @Role(['ADMIN'])
  editMockExamCategory(
    @Args('input') editMockExamCategoryInput: EditMockExamCategoryInput,
  ): Promise<EditMockExamCategoryOutput> {
    return this.mockExamCategoryService.editMockExamCategory(
      editMockExamCategoryInput,
    );
  }

  @Query(() => ReadAllMockExamCategoriesOutput)
  readAllMockExamCategories(): Promise<ReadAllMockExamCategoriesOutput> {
    return this.mockExamCategoryService.readAllMockExamCategories();
  }
}
