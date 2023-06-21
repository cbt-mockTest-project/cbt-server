import { DeleteQuestionCardCategoryOutput, DeleteQuestionCardCategoryInput } from './dtos/DeleteQuestionCardCategory.dto';
import { CreateQuestionCardCategoryOutput, CreateQuestionCardCategoryInput } from './dtos/createQuestionCardCategory.dto';
import { UpdateQuestionCardCategoryOutput, UpdateQuestionCardCategoryInput } from './dtos/updateQuestionCardCategory.dto';
import { User } from 'src/users/entities/user.entity';
import { ReadMyQuestionCardCategoriesOutput } from './dtos/readMyQuestionCardCategories.dto';
import { QuestionCardCategoryService } from './question-card-category.service';
export declare class QuestionCardCategoryResolver {
    private readonly questionCardCategoryService;
    constructor(questionCardCategoryService: QuestionCardCategoryService);
    readMyQuestionCardCategories(user: User): Promise<ReadMyQuestionCardCategoriesOutput>;
    updateQuestionCardCategory(updateQuestionCardCategoryInput: UpdateQuestionCardCategoryInput, user: User): Promise<UpdateQuestionCardCategoryOutput>;
    createQuestionCardCategory(createQuestionCardCategoryInput: CreateQuestionCardCategoryInput, user: User): Promise<CreateQuestionCardCategoryOutput>;
    deleteQuestionCardCategory(deleteQuestionCardCategoryInput: DeleteQuestionCardCategoryInput, user: User): Promise<DeleteQuestionCardCategoryOutput>;
}
