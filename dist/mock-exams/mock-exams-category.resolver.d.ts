import { ReadMyMockExamCategoriesOutput } from './dtos/readMyMockExamCategories.dto';
import { User } from 'src/users/entities/user.entity';
import { ReadAllMockExamCategoriesInput, ReadAllMockExamCategoriesOutput } from './dtos/readAllCategories.dto';
import { CreateMockExamCategoryInput, CreateMockExamCategoryOutput } from './dtos/createCategory.dto';
import { MockExamCategoryService } from './mock-exams-category.service';
import { DeleteMockExamCategoryInput, DeleteMockExamCategoryOutput } from './dtos/deleteCategory.dto';
import { EditMockExamCategoryInput, EditMockExamCategoryOutput } from './dtos/editCategory.dto';
export declare class MockExamCategoryResolver {
    private readonly mockExamCategoryService;
    constructor(mockExamCategoryService: MockExamCategoryService);
    createMockExamCategory(user: User, createMockExamCategoryInput: CreateMockExamCategoryInput): Promise<CreateMockExamCategoryOutput>;
    deleteMockExamCategory(user: any, deleteMockExamCategoryInput: DeleteMockExamCategoryInput): Promise<DeleteMockExamCategoryOutput>;
    editMockExamCategory(user: any, editMockExamCategoryInput: EditMockExamCategoryInput): Promise<EditMockExamCategoryOutput>;
    readAllMockExamCategories(readAllMockExamCategoriesInput?: ReadAllMockExamCategoriesInput): Promise<ReadAllMockExamCategoriesOutput>;
    readMyMockExamCategories(user: User): Promise<ReadMyMockExamCategoriesOutput>;
}
