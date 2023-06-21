import { Repository } from 'typeorm';
import { MockExamQuestionFeedbackRecommendation } from './entities/mock-exam-question-feedback-recommendation.entity';
import { MockExamQuestionFeedback } from './entities/mock-exam-question-feedback.entity';
import { User } from 'src/users/entities/user.entity';
import { UpdateMockExamQuestionFeedbackRecommendationInput, UpdateMockExamQuestionFeedbackRecommendationOutput } from './dtos/updateMockExamQuestionFeedbackRecommendation.dto';
import { GetFeedbacksByRecommendationCountInput, GetFeedbacksByRecommendationCountOutput } from './dtos/getFeedbacksByRecommendationCount.dto';
export declare class MockExamQuestionFeedbackRecommendationService {
    private readonly mockExamQuestionFeedbackRecommendation;
    private readonly mockExamQuestionFeedback;
    private readonly users;
    constructor(mockExamQuestionFeedbackRecommendation: Repository<MockExamQuestionFeedbackRecommendation>, mockExamQuestionFeedback: Repository<MockExamQuestionFeedback>, users: Repository<User>);
    updateMockExamQuestionFeedbackRecommendation(updateMockExamQuestionFeedbackRecommendationInput: UpdateMockExamQuestionFeedbackRecommendationInput, user: User): Promise<UpdateMockExamQuestionFeedbackRecommendationOutput>;
    getFeedbacksByRecommendationCount(getFeedbacksByRecommendationCountInput: GetFeedbacksByRecommendationCountInput): Promise<GetFeedbacksByRecommendationCountOutput>;
}
