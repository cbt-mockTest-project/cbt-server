import { ResetMyExamQuestionStateInput, ResetMyExamQuestionStateOutput } from './dtos/resetMyExamQuestionState.dto';
import { User } from 'src/users/entities/user.entity';
import { CreateOrUpdateMockExamQuestionStateInput, CreateOrUpdateMockExamQuestionStateOutput } from './dtos/createOrUpdateMockExamQuestionState.dto';
import { Repository } from 'typeorm';
import { MockExamQuestionState } from './entities/mock-exam-question-state.entity';
import { MockExamQuestion } from './entities/mock-exam-question.entity';
export declare class MockExamQuestionStateService {
    private readonly mockExamQuestionState;
    private readonly mockExamQuestion;
    constructor(mockExamQuestionState: Repository<MockExamQuestionState>, mockExamQuestion: Repository<MockExamQuestion>);
    createOrUpdateMockExamQuestionState(user: User, createOrUpdateMockExamQuestionStateInput: CreateOrUpdateMockExamQuestionStateInput): Promise<CreateOrUpdateMockExamQuestionStateOutput>;
    resetMyExamQuestionState(resetMyExamQuestionStateInput: ResetMyExamQuestionStateInput, user: User): Promise<ResetMyExamQuestionStateOutput>;
}
