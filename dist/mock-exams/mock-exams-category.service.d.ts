import { User } from 'src/users/entities/user.entity';
import { CreateMockExamCategoryInput, CreateMockExamCategoryOutput } from './dtos/createCategory.dto';
import { ExamCategoryRole, MockExamCategory } from './entities/mock-exam-category.entity';
import { Repository } from 'typeorm';
import { DeleteMockExamCategoryInput, DeleteMockExamCategoryOutput } from './dtos/deleteCategory.dto';
import { EditMockExamCategoryInput, EditMockExamCategoryOutput } from './dtos/editCategory.dto';
import { ReadAllMockExamCategoriesInput, ReadAllMockExamCategoriesOutput } from './dtos/readAllCategories.dto';
export declare class MockExamCategoryService {
    private readonly mockExamCategories;
    private readonly examCategoryRoles;
    constructor(mockExamCategories: Repository<MockExamCategory>, examCategoryRoles: Repository<ExamCategoryRole>);
    createMockExamCategory(user: User, createMockExamCategoryInput: CreateMockExamCategoryInput): Promise<CreateMockExamCategoryOutput>;
    deleteMockExamCategory(user: User, deleteMockExamCategoryInput: DeleteMockExamCategoryInput): Promise<DeleteMockExamCategoryOutput>;
    editMockExamCategory(user: User, editMockExamCategoryInput: EditMockExamCategoryInput): Promise<EditMockExamCategoryOutput>;
    readAllMockExamCategories(readAllMockExamCategoriesInput: ReadAllMockExamCategoriesInput): Promise<ReadAllMockExamCategoriesOutput>;
    readMyMockExamCategories(user: User): Promise<{
        ok: boolean;
        categories: MockExamCategory[];
        error?: undefined;
    } | {
        ok: boolean;
        error: string;
        categories?: undefined;
    }>;
}
