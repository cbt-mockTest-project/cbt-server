import { MockExamQuestionFeedback } from './../entities/mock-exam-question-feedback.entity';
import { CoreOutput } from './../../common/dtos/output.dto';
export declare class ReadAllMockExamQuestionFeedbackOutput extends CoreOutput {
    feedbacks?: MockExamQuestionFeedback[];
}
