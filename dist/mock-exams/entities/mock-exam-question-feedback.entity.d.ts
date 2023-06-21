import { User } from 'src/users/entities/user.entity';
import { MockExamQuestion } from './mock-exam-question.entity';
import { CoreEntity } from './../../common/entities/core.entity';
import { MockExamQuestionFeedbackRecommendation } from './mock-exam-question-feedback-recommendation.entity';
export declare enum QuestionFeedbackType {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
    REPORT = "REPORT"
}
export declare class RecommendationCount {
    good: number;
    bad: number;
}
export declare class MyRecommedationStatus {
    isGood: boolean;
    isBad: boolean;
}
export declare class MockExamQuestionFeedback extends CoreEntity {
    content: string;
    mockExamQuestion: MockExamQuestion;
    user: User;
    recommendation: MockExamQuestionFeedbackRecommendation[];
    type: QuestionFeedbackType;
    recommendationCount: RecommendationCount;
    myRecommedationStatus: MyRecommedationStatus;
}
