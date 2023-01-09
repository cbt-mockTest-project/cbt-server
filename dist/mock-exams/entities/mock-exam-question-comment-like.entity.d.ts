import { MockExamQuestionComment } from './mock-exam-question-comment.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
export declare class MockExamQuestionCommentLike extends CoreEntity {
    comment: MockExamQuestionComment;
    user: User;
}
