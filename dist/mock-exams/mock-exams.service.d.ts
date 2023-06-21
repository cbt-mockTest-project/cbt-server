import { User } from './../users/entities/user.entity';
import { MockExamQuestionState } from 'src/mock-exams/entities/mock-exam-question-state.entity';
import { ReadMockExamTitlesByCateoryInput, ReadMockExamTitlesByCateoryOutput } from './dtos/readMockExamTitlesByCateory.dto';
import { ReadMockExamInput, ReadMockExamOutput } from './dtos/readMockExam.dto';
import { SearchMockExamInput, SearchMockExamOutput } from './dtos/searchMockExam.dto';
import { ReadAllMockExamsOutput, ReadAllMockExamsInput } from './dtos/readAllMockExam.dto';
import { DeleteMockExamInput, DeleteMockExamOutput } from './dtos/deleteMockExam.dto';
import { MockExamCategory } from './entities/mock-exam-category.entity';
import { MockExam } from './entities/mock-exam.entity';
import { Repository } from 'typeorm';
import { CreateMockExamInput, CreateMockExamOutput } from './dtos/createMockExam.dto';
import { EditMockExamInput, EditMockExamOutput } from './dtos/editMockExam.dto';
import { FindMyExamHistoryOutput, FindMyExamHistoryInput } from './dtos/findMyExamHistory.dto';
export declare class MockExamService {
    private readonly mockExam;
    private readonly mockExamCategory;
    private readonly mockExamQuestionState;
    constructor(mockExam: Repository<MockExam>, mockExamCategory: Repository<MockExamCategory>, mockExamQuestionState: Repository<MockExamQuestionState>);
    createMockExam(user: User, createMockExamInput: CreateMockExamInput): Promise<CreateMockExamOutput>;
    editMockExam(user: User, editMockExamInput: EditMockExamInput): Promise<EditMockExamOutput>;
    deleteMockExam(user: User, deleteMockExamInput: DeleteMockExamInput): Promise<DeleteMockExamOutput>;
    readAllMockExam(readAllMockExamsInput: ReadAllMockExamsInput): Promise<ReadAllMockExamsOutput>;
    searchMockExam(searchMockExamInput: SearchMockExamInput): Promise<SearchMockExamOutput>;
    readMockExam(readMockExamInput: ReadMockExamInput): Promise<ReadMockExamOutput>;
    readMockExamTitlesByCateory(user: User, readMockExamTitlesByCateoryInput: ReadMockExamTitlesByCateoryInput): Promise<ReadMockExamTitlesByCateoryOutput>;
    findMyExamHistory(user: User, findMyExamHistoryInput: FindMyExamHistoryInput): Promise<FindMyExamHistoryOutput>;
}
