import { MockExamQuestionFeedbackRecommendation } from '../entities/mock-exam-question-feedback-recommendation.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
declare const UpdateMockExamQuestionFeedbackRecommendationInput_base: import("@nestjs/common").Type<Pick<MockExamQuestionFeedbackRecommendation, "type">>;
export declare class UpdateMockExamQuestionFeedbackRecommendationInput extends UpdateMockExamQuestionFeedbackRecommendationInput_base {
    feedbackId: number;
}
export declare class UpdateMockExamQuestionFeedbackRecommendationOutput extends CoreOutput {
    recommendation?: MockExamQuestionFeedbackRecommendation;
}
export {};
