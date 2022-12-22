import { User } from 'src/users/entities/user.entity';
import { MockExamQuestion } from './mock-exam-question.entity';
import { CoreEntity } from './../../common/entities/core.entity';
export declare class MockExamQuestionFeedback extends CoreEntity {
    content: string;
    mockExamQuestion: MockExamQuestion;
    user: User;
}
