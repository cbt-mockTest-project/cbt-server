import { MockExamQuestionFeedbackRecommendationService } from './mock-exams-question-feedback-recommendation.service';
import { UpdateMockExamQuestionFeedbackRecommendationInput, UpdateMockExamQuestionFeedbackRecommendationOutput } from './dtos/updateMockExamQuestionFeedbackRecommendation.dto';
import { User } from 'src/users/entities/user.entity';
import { GetFeedbacksByRecommendationCountInput, GetFeedbacksByRecommendationCountOutput } from './dtos/getFeedbacksByRecommendationCount.dto';
export declare class MockExamQuestionFeedbackRecommendationResolver {
    private readonly mockExamQuestionFeedbackRecommendationService;
    constructor(mockExamQuestionFeedbackRecommendationService: MockExamQuestionFeedbackRecommendationService);
    updateMockExamQuestionFeedbackRecommendation(updateMockExamQuestionFeedbackRecommendationInput: UpdateMockExamQuestionFeedbackRecommendationInput, user: User): Promise<UpdateMockExamQuestionFeedbackRecommendationOutput>;
    getFeedbacksByRecommendationCount(getFeedbacksByRecommendationCountInput: GetFeedbacksByRecommendationCountInput): Promise<GetFeedbacksByRecommendationCountOutput>;
}
