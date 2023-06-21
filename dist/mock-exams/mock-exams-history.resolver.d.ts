import { User } from 'src/users/entities/user.entity';
import { CreateMockExamHistoryInput, CreateMockExamHistoryOutput } from './dtos/createMockExamHistory';
import { ReadMyExamHistoryOutput } from './dtos/readMyExamHistory.dto';
import { MockExamHistoryService } from './mock-exams-history.service';
export declare class MockExamHistoryResolver {
    private readonly mockExamHistoryService;
    constructor(mockExamHistoryService: MockExamHistoryService);
    createMockExamHistory(createMockExamHistoryInput: CreateMockExamHistoryInput, user: User): Promise<CreateMockExamHistoryOutput>;
    readMyExamHistory(user: User): Promise<ReadMyExamHistoryOutput>;
}
