import { ExamCoAuthor } from './../../exam-co-author/entities/exam-co-author.entity';
import { MockExamHistory } from './../../mock-exams/entities/mock-exam-history';
import { QuestionCard } from './../../question-card/entities/question-card.entity';
import { MockExamCategory } from './../../mock-exams/entities/mock-exam-category.entity';
import { PostComment } from './../../post/entities/postComment.entity';
import { Post } from './../../post/entities/post.entity';
import { MockExamQuestionComment } from './../../mock-exams/entities/mock-exam-question-comment.entity';
import { CoreEntity } from './../../common/entities/core.entity';
import { MockExamQuestionState } from 'src/mock-exams/entities/mock-exam-question-state.entity';
import { MockExamQuestionFeedback } from 'src/mock-exams/entities/mock-exam-question-feedback.entity';
import { Feedback } from './feedback.entity';
import { MockExamQuestionCommentLike } from 'src/mock-exams/entities/mock-exam-question-comment-like.entity';
import { Notice } from './notice.entity';
import { MockExamQuestionBookmark } from 'src/mock-exams/entities/mock-exam-question-bookmark.entity';
import { Visit } from 'src/visit/entities/visit.entity';
import { MockExam } from 'src/mock-exams/entities/mock-exam.entity';
import { MockExamQuestionFeedbackRecommendation } from 'src/mock-exams/entities/mock-exam-question-feedback-recommendation.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { UserAndRole } from './userAndRole.entity';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Todo } from 'src/todo/entities/Todo.entity';
export declare enum UserRole {
    CLIENT = "CLIENT",
    CLIENT_BASIC = "CLIENT_BASIC",
    CLIENT_SAFE_PREMIUM = "CLIENT_SAFE_PREMIUM",
    ADMIN = "ADMIN",
    PARTNER = "PARTNER",
    PAYMENT_TEST = "PAYMENT_TEST"
}
export declare enum LoginType {
    NAVER = "NAVER",
    KAKAO = "KAKAO",
    GOOGLE = "GOOGLE",
    EMAIL = "EMAIL"
}
export declare class User extends CoreEntity {
    email: string;
    nickname: string;
    isAllowAdblock: boolean;
    usedFreeTrial: boolean;
    password: string;
    role: UserRole;
    LoginType: LoginType;
    mockExamQuestionState: MockExamQuestionState[];
    mockExam: MockExam[];
    mockExamCategory: MockExamCategory[];
    mockExamQuestionComment: MockExamQuestionComment[];
    postComment: PostComment[];
    mockExamQuestionCommentLike: MockExamQuestionCommentLike[];
    questionFeedback: MockExamQuestionFeedback[];
    feedback: Feedback[];
    visit: Visit[];
    notice: Notice[];
    payments: Payment[];
    post: Post[];
    examCoAuthor: ExamCoAuthor[];
    attendances: Attendance[];
    deletedAt?: Date;
    mockExamQuestionBookmark: MockExamQuestionBookmark[];
    mockExamQuestion: MockExamQuestionBookmark[];
    mockExamHistory: MockExamHistory[];
    todos: Todo[];
    questionCards: QuestionCard[];
    questionCardCategorys: QuestionCard[];
    feedbackRecommendation: MockExamQuestionFeedbackRecommendation[];
    userRoles: UserAndRole[];
    hashPassword(): Promise<void>;
    checkPassword(hashedPassword: string): Promise<boolean>;
}
