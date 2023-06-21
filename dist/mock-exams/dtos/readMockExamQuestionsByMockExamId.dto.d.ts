import { MockExamQuestion } from '../entities/mock-exam-question.entity';
import { CoreOutput } from '../../common/dtos/output.dto';
import { QuestionState } from '../entities/mock-exam-question-state.entity';
export declare class ReadMockExamQuestionsByMockExamIdInput {
    isRandom?: boolean;
    bookmarked?: boolean;
    states?: QuestionState[];
    id?: number;
    ids?: number[];
    limit?: number;
}
export declare class ReadMockExamQuestionsByMockExamIdOutput extends CoreOutput {
    questions?: MockExamQuestion[];
    count?: number;
    title?: string;
    author?: string;
}
