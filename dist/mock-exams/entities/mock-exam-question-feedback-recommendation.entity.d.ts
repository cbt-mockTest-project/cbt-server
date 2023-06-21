import { MockExamQuestionFeedback } from './mock-exam-question-feedback.entity';
import { User } from 'src/users/entities/user.entity';
import { CoreEntity } from '../../common/entities/core.entity';
export declare enum QuestionFeedbackRecommendationType {
    GOOD = "GOOD",
    BAD = "BAD"
}
export declare class MockExamQuestionFeedbackRecommendation extends CoreEntity {
    feedback: MockExamQuestionFeedback;
    user: User;
    type: QuestionFeedbackRecommendationType;
}
