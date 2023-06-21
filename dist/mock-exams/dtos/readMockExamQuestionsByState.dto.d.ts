import { MockExamQuestionState, QuestionState } from './../entities/mock-exam-question-state.entity';
import { CoreOutput } from './../../common/dtos/output.dto';
export declare class ReadMockExamQuestionsByStateInput {
    examId?: number;
    questionIds?: number[];
    states: QuestionState[];
}
export declare class ReadMockExamQuestionsByStateOutput extends CoreOutput {
    mockExamQusetions?: MockExamQuestionState[];
}
