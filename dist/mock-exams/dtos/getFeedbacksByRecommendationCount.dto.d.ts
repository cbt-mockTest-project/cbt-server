import { MockExamQuestionFeedback } from '../entities/mock-exam-question-feedback.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
export declare class GetFeedbacksByRecommendationCountInput {
    count: number;
}
export declare class GetFeedbacksByRecommendationCountOutput extends CoreOutput {
    feedbacks?: MockExamQuestionFeedback[];
}
