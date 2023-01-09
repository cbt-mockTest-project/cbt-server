import { QuestionState } from './../entities/mock-exam-question-state.entity';
import { MockExamQuestion } from './../entities/mock-exam-question.entity';
import { CoreOutput } from './../../common/dtos/output.dto';
export declare class ReadMockExamQuestionInput {
    questionId: number;
    examId?: number;
}
export declare class ReadMockExamQuestionOutput extends CoreOutput {
    mockExamQusetion?: MockExamQuestion;
    state?: QuestionState;
}
