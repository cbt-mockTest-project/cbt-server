import { ResetMyExamQuestionStateInput, ResetMyExamQuestionStateOutput } from './dtos/resetMyExamQuestionState.dto';
import { User } from 'src/users/entities/user.entity';
import { CreateOrUpdateMockExamQuestionStateOutput, CreateOrUpdateMockExamQuestionStateInput } from './dtos/createOrUpdateMockExamQuestionState.dto';
import { MockExamQuestionStateService } from './mock-exams-question-state.service';
export declare class MockExamQuestionStateResolver {
    private readonly mockExamQuestionStateService;
    constructor(mockExamQuestionStateService: MockExamQuestionStateService);
    createOrUpdateMockExamQuestionState(user: User, createOrUpdateMockExamQuestionStateInput: CreateOrUpdateMockExamQuestionStateInput): Promise<CreateOrUpdateMockExamQuestionStateOutput>;
    resetMyExamQuestionState(resetMyExamQuestionStateInput: ResetMyExamQuestionStateInput, user: User): Promise<ResetMyExamQuestionStateOutput>;
}
