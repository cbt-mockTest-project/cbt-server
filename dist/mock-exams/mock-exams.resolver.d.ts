import { FindMyExamHistoryOutput, FindMyExamHistoryInput } from './dtos/findMyExamHistory.dto';
import { User } from './../users/entities/user.entity';
import { ReadMockExamOutput, ReadMockExamInput } from './dtos/readMockExam.dto';
import { ReadAllMockExamsOutput, ReadAllMockExamsInput } from './dtos/readAllMockExam.dto';
import { CreateMockExamOutput, CreateMockExamInput } from './dtos/createMockExam.dto';
import { MockExamService } from './mock-exams.service';
import { EditMockExamOutput, EditMockExamInput } from './dtos/editMockExam.dto';
import { DeleteMockExamInput, DeleteMockExamOutput } from './dtos/deleteMockExam.dto';
import { SearchMockExamOutput, SearchMockExamInput } from './dtos/searchMockExam.dto';
import { ReadMockExamTitlesByCateoryOutput, ReadMockExamTitlesByCateoryInput } from './dtos/readMockExamTitlesByCateory.dto';
export declare class MockExamResolver {
    private readonly mockExamService;
    constructor(mockExamService: MockExamService);
    createMockExam(createMockExamInput: CreateMockExamInput): Promise<CreateMockExamOutput>;
    editMockExam(editMockExamInput: EditMockExamInput): Promise<EditMockExamOutput>;
    deleteMockExam(deleteMockExamInput: DeleteMockExamInput): Promise<DeleteMockExamOutput>;
    readAllMockExam(readAllMockExamsInput: ReadAllMockExamsInput): Promise<ReadAllMockExamsOutput>;
    searchMockExam(searchMockExamInput: SearchMockExamInput): Promise<SearchMockExamOutput>;
    readMockExam(readMockExamInput: ReadMockExamInput): Promise<ReadMockExamOutput>;
    readMockExamTitlesByCateory(readMockExamTitlesByCateoryInput: ReadMockExamTitlesByCateoryInput): Promise<ReadMockExamTitlesByCateoryOutput>;
    findMyExamHistory(user: User, findMyExamHistoryInput: FindMyExamHistoryInput): Promise<FindMyExamHistoryOutput>;
}
