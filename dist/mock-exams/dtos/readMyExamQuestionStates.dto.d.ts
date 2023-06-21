import { MockExamQuestionState } from 'src/mock-exams/entities/mock-exam-question-state.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
export declare class ReadMyExamQuestionStateInput {
    questionId: number;
}
export declare class ReadMyExamQuestionStateOutput extends CoreOutput {
    state?: MockExamQuestionState;
}
