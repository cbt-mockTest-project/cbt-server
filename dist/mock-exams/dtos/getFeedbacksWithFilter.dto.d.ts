import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExamQuestionFeedback, QuestionFeedbackType } from '../entities/mock-exam-question-feedback.entity';
export declare class GetFeedbacksWithFilterInput {
    examId: number;
    goodCount: number;
    badCount: number;
    types: QuestionFeedbackType[];
}
export declare class GetFeedbacksWithFilterOutput extends CoreOutput {
    feedbacks?: MockExamQuestionFeedback[];
}
