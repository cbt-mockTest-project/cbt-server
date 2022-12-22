import { CreateMockExamCategoryInput, CreateMockExamCategoryOutput } from './dtos/createCategory.dto';
import { MockExamCategory } from './entities/mock-exam-category.entity';
import { Repository } from 'typeorm';
import { DeleteMockExamCategoryInput, DeleteMockExamCategoryOutput } from './dtos/deleteCategory.dto';
import { EditMockExamCategoryInput, EditMockExamCategoryOutput } from './dtos/editCategory.dto';
import { ReadAllMockExamCategoriesOutput } from './dtos/readAllCategories.dto';
export declare class MockExamCategoryService {
    private readonly mockExamCategories;
    constructor(mockExamCategories: Repository<MockExamCategory>);
    createMockExamCategory(createMockExamCategoryInput: CreateMockExamCategoryInput): Promise<CreateMockExamCategoryOutput>;
    deleteMockExamCategory(deleteMockExamCategoryInput: DeleteMockExamCategoryInput): Promise<DeleteMockExamCategoryOutput>;
    editMockExamCategory(editMockExamCategoryInput: EditMockExamCategoryInput): Promise<EditMockExamCategoryOutput>;
    readAllMockExamCategories(): Promise<ReadAllMockExamCategoriesOutput>;
}
