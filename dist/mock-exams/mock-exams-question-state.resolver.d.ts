import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from 'src/users/entities/user.entity';
import { CreateOrUpdateMockExamQuestionStateInput, CreateOrUpdateMockExamQuestionStateOutput } from './dtos/createOrUpdateMockExamQuestionState.dto';
import { ReadExamTitleAndIdByQuestionStateOutput } from './dtos/readExamTitleAndIdByQuestionState.dto';
import { ReadMyExamQuestionStateInput, ReadMyExamQuestionStateOutput } from './dtos/readMyExamQuestionStates.dto';
import { ResetMyExamQuestionStateInput, ResetMyExamQuestionStateOutput } from './dtos/resetMyExamQuestionState.dto';
import { MockExamQuestionStateService } from './mock-exams-question-state.service';
export declare class MockExamQuestionStateResolver {
    private readonly mockExamQuestionStateService;
    constructor(mockExamQuestionStateService: MockExamQuestionStateService);
    createOrUpdateMockExamQuestionState(user: User, createOrUpdateMockExamQuestionStateInput: CreateOrUpdateMockExamQuestionStateInput): Promise<CreateOrUpdateMockExamQuestionStateOutput>;
    resetMyExamQuestionState(resetMyExamQuestionStateInput: ResetMyExamQuestionStateInput, user: User): Promise<ResetMyExamQuestionStateOutput>;
    readMyExamQuestionState(readMyExamQuestionState: ReadMyExamQuestionStateInput, user: User): Promise<ReadMyExamQuestionStateOutput>;
    readExamTitleAndIdByQuestionState(user: User): Promise<ReadExamTitleAndIdByQuestionStateOutput>;
    updateQuestionStatesToCore(user: User): Promise<CoreOutput>;
}
