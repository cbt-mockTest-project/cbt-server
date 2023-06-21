import { MockExamQuestionCommentLike } from 'src/mock-exams/entities/mock-exam-question-comment-like.entity';
import { MockExamQuestion } from './mock-exam-question.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
export declare class MockExamQuestionComment extends CoreEntity {
    content: string;
    question: MockExamQuestion;
    user: User;
    commentLike: MockExamQuestionCommentLike[];
    likeState: boolean;
    likesCount?: number;
}
