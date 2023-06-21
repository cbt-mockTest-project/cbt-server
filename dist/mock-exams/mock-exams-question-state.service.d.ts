import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrUpdateMockExamQuestionStateInput, CreateOrUpdateMockExamQuestionStateOutput } from './dtos/createOrUpdateMockExamQuestionState.dto';
import { ReadExamTitleAndIdByQuestionStateOutput } from './dtos/readExamTitleAndIdByQuestionState.dto';
import { ReadMyExamQuestionStateInput, ReadMyExamQuestionStateOutput } from './dtos/readMyExamQuestionStates.dto';
import { ResetMyExamQuestionStateInput, ResetMyExamQuestionStateOutput } from './dtos/resetMyExamQuestionState.dto';
import { MockExamQuestionState } from './entities/mock-exam-question-state.entity';
import { MockExamQuestion } from './entities/mock-exam-question.entity';
export declare class MockExamQuestionStateService {
    private readonly mockExamQuestionState;
    private readonly mockExamQuestion;
    constructor(mockExamQuestionState: Repository<MockExamQuestionState>, mockExamQuestion: Repository<MockExamQuestion>);
    createOrUpdateMockExamQuestionState(user: User, createOrUpdateMockExamQuestionStateInput: CreateOrUpdateMockExamQuestionStateInput): Promise<CreateOrUpdateMockExamQuestionStateOutput>;
    readMyExamQuestionState(readMyExamQuestionState: ReadMyExamQuestionStateInput, user: User): Promise<ReadMyExamQuestionStateOutput>;
    resetMyExamQuestionState(resetMyExamQuestionStateInput: ResetMyExamQuestionStateInput, user: User): Promise<ResetMyExamQuestionStateOutput>;
    readExamTitleAndIdByQuestionState(user: User): Promise<ReadExamTitleAndIdByQuestionStateOutput>;
    updateQuestionStatesToCore(user: User): Promise<CoreOutput>;
}
