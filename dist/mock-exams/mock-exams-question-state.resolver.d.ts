import { ResetMyExamQuestionStateInput, ResetMyExamQuestionStateOutput } from './dtos/resetMyExamQuestionState.dto';
import { User } from 'src/users/entities/user.entity';
import { CreateOrUpdateMockExamQuestionStateOutput, CreateOrUpdateMockExamQuestionStateInput } from './dtos/createOrUpdateMockExamQuestionState.dto';
import { MockExamQuestionStateService } from './mock-exams-question-state.service';
import { ReadMyExamQuestionStateInput, ReadMyExamQuestionStateOutput } from './dtos/readMyExamQuestionStates.dto';
export declare class MockExamQuestionStateResolver {
    private readonly mockExamQuestionStateService;
    constructor(mockExamQuestionStateService: MockExamQuestionStateService);
    createOrUpdateMockExamQuestionState(user: User, createOrUpdateMockExamQuestionStateInput: CreateOrUpdateMockExamQuestionStateInput): Promise<CreateOrUpdateMockExamQuestionStateOutput>;
    resetMyExamQuestionState(resetMyExamQuestionStateInput: ResetMyExamQuestionStateInput, user: User): Promise<ResetMyExamQuestionStateOutput>;
    readMyExamQuestionState(readMyExamQuestionState: ReadMyExamQuestionStateInput, user: User): Promise<ReadMyExamQuestionStateOutput>;
}
