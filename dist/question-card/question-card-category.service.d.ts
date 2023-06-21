import { DeleteQuestionCardCategoryInput, DeleteQuestionCardCategoryOutput } from './dtos/DeleteQuestionCardCategory.dto';
import { User } from './../users/entities/user.entity';
import { Repository } from 'typeorm';
import { QuestionCardCategory } from './entities/question-card-category';
import { ReadMyQuestionCardCategoriesOutput } from './dtos/readMyQuestionCardCategories.dto';
import { CreateQuestionCardCategoryInput, CreateQuestionCardCategoryOutput } from './dtos/createQuestionCardCategory.dto';
import { UpdateQuestionCardCategoryInput, UpdateQuestionCardCategoryOutput } from './dtos/updateQuestionCardCategory.dto';
export declare class QuestionCardCategoryService {
    private readonly questionCardCategory;
    constructor(questionCardCategory: Repository<QuestionCardCategory>);
    readMyQuestionCardCategories(user: User): Promise<ReadMyQuestionCardCategoriesOutput>;
    createQuestionCardCategory(createQuestionCardCategoryInput: CreateQuestionCardCategoryInput, user: User): Promise<CreateQuestionCardCategoryOutput>;
    deleteQuestionCardCategory(user: User, deleteQuestionCardCategoryInput: DeleteQuestionCardCategoryInput): Promise<DeleteQuestionCardCategoryOutput>;
    updateQuestionCardCategory(user: User, updateQuestionCardCategoryInput: UpdateQuestionCardCategoryInput): Promise<UpdateQuestionCardCategoryOutput>;
}
