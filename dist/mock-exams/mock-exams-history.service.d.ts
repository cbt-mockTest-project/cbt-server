import { ReadMyExamHistoryOutput } from './dtos/readMyExamHistory.dto';
import { User } from 'src/users/entities/user.entity';
import { MockExam } from 'src/mock-exams/entities/mock-exam.entity';
import { Repository } from 'typeorm';
import { MockExamHistory } from './entities/mock-exam-history';
import { CreateMockExamHistoryInput, CreateMockExamHistoryOutput } from './dtos/createMockExamHistory';
export declare class MockExamHistoryService {
    private readonly mockExamHistory;
    private readonly mockExam;
    constructor(mockExamHistory: Repository<MockExamHistory>, mockExam: Repository<MockExam>);
    createMockExamHistory(createMockExamHistoryInput: CreateMockExamHistoryInput, user: User): Promise<CreateMockExamHistoryOutput>;
    readMyExamHistory(user: User): Promise<ReadMyExamHistoryOutput>;
}
