import { MockExamQuestion } from './mock-exam-question.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
export declare class MockExamQuestionBookmark extends CoreEntity {
    question: MockExamQuestion;
    user: User;
}
