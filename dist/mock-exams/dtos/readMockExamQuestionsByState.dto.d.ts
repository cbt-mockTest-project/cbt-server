import { QuestionState } from './../entities/mock-exam-question-state.entity';
import { MockExamQuestion } from './../entities/mock-exam-question.entity';
import { CoreOutput } from './../../common/dtos/output.dto';
export declare class ReadMockExamQuestionsByStateInput {
    examId: number;
    states: QuestionState[];
}
export declare class ReadMockExamQuestionsByStateOutput extends CoreOutput {
    mockExamQusetions?: MockExamQuestion[];
}
