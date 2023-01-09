import { ReadAllMockExamCategoriesOutput } from './dtos/readAllCategories.dto';
import { CreateMockExamCategoryInput, CreateMockExamCategoryOutput } from './dtos/createCategory.dto';
import { MockExamCategoryService } from './mock-exams-category.service';
import { DeleteMockExamCategoryInput, DeleteMockExamCategoryOutput } from './dtos/deleteCategory.dto';
import { EditMockExamCategoryInput, EditMockExamCategoryOutput } from './dtos/editCategory.dto';
export declare class MockExamCategoryResolver {
    private readonly mockExamCategoryService;
    constructor(mockExamCategoryService: MockExamCategoryService);
    createMockExamCategory(createMockExamCategoryInput: CreateMockExamCategoryInput): Promise<CreateMockExamCategoryOutput>;
    deleteMockExamCategory(deleteMockExamCategoryInput: DeleteMockExamCategoryInput): Promise<DeleteMockExamCategoryOutput>;
    editMockExamCategory(editMockExamCategoryInput: EditMockExamCategoryInput): Promise<EditMockExamCategoryOutput>;
    readAllMockExamCategories(): Promise<ReadAllMockExamCategoriesOutput>;
}
