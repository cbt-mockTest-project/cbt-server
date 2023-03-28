import {
  DeleteQuestionCardCategoryOutput,
  DeleteQuestionCardCategoryInput,
} from './dtos/DeleteQuestionCardCategory.dto';
import {
  CreateQuestionCardCategoryOutput,
  CreateQuestionCardCategoryInput,
} from './dtos/createQuestionCardCategory.dto';
import {
  UpdateQuestionCardCategoryOutput,
  UpdateQuestionCardCategoryInput,
} from './dtos/updateQuestionCardCategory.dto';
import { User } from 'src/users/entities/user.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { ReadMyQuestionCardCategoriesOutput } from './dtos/readMyQuestionCardCategories.dto';
import { QuestionCardCategory } from './entities/question-card-category';
import { QuestionCardCategoryService } from './question-card-category.service';
import { Role } from 'src/auth/role.decorators';

@Resolver(() => QuestionCardCategory)
export class QuestionCardCategoryResolver {
  constructor(
    private readonly questionCardCategoryService: QuestionCardCategoryService,
  ) {}

  //crud 만들기
  @Role(['ANY'])
  @Query(() => ReadMyQuestionCardCategoriesOutput)
  readMyQuestionCardCategories(@AuthUser() user: User) {
    return this.questionCardCategoryService.readMyQuestionCardCategories(user);
  }

  @Role(['ANY'])
  @Mutation(() => UpdateQuestionCardCategoryOutput)
  updateQuestionCardCategory(
    @Args('input')
    updateQuestionCardCategoryInput: UpdateQuestionCardCategoryInput,
    @AuthUser() user: User,
  ) {
    return this.questionCardCategoryService.updateQuestionCardCategory(
      user,
      updateQuestionCardCategoryInput,
    );
  }

  @Role(['ANY'])
  @Mutation(() => CreateQuestionCardCategoryOutput)
  createQuestionCardCategory(
    @Args('input')
    createQuestionCardCategoryInput: CreateQuestionCardCategoryInput,
    @AuthUser() user: User,
  ) {
    return this.questionCardCategoryService.createQuestionCardCategory(
      createQuestionCardCategoryInput,
      user,
    );
  }

  @Role(['ANY'])
  @Mutation(() => DeleteQuestionCardCategoryOutput)
  deleteQuestionCardCategory(
    @Args('input')
    deleteQuestionCardCategoryInput: DeleteQuestionCardCategoryInput,
    @AuthUser() user: User,
  ) {
    return this.questionCardCategoryService.deleteQuestionCardCategory(
      user,
      deleteQuestionCardCategoryInput,
    );
  }
}
