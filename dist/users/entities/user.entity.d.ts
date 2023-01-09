import { MockExamQuestionComment } from './../../mock-exams/entities/mock-exam-question-comment.entity';
import { CoreEntity } from './../../common/entities/core.entity';
import { MockExamQuestionState } from 'src/mock-exams/entities/mock-exam-question-state.entity';
import { MockExamQuestionFeedback } from 'src/mock-exams/entities/mock-exam-question-feedback.entity';
import { Feedback } from './feedback.entity';
import { MockExamQuestionCommentLike } from 'src/mock-exams/entities/mock-exam-question-comment-like.entity';
import { Notice } from './notice.entity';
import { MockExamQuestionBookmark } from 'src/mock-exams/entities/mock-exam-question-bookmark.entity';
export declare enum UserRole {
    CLIENT = "CLIENT",
    ADMIN = "ADMIN"
}
export declare class User extends CoreEntity {
    email: string;
    nickname: string;
    password: string;
    role: UserRole;
    mockExamQuestionState: MockExamQuestionState[];
    mockExamQuestionComment: MockExamQuestionComment[];
    mockExamQuestionCommentLike: MockExamQuestionCommentLike[];
    questionFeedback: MockExamQuestionFeedback[];
    feedback: Feedback[];
    notice: Notice[];
    deletedAt?: Date;
    mockExamQuestionBookmark: MockExamQuestionBookmark[];
    hashPassword(): Promise<void>;
    checkPassword(hashedPassword: string): Promise<boolean>;
}
