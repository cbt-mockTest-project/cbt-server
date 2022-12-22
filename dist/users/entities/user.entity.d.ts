import { CoreEntity } from './../../common/entities/core.entity';
import { MockExamQuestionState } from 'src/mock-exams/entities/mock-exam-question-state.entity';
import { MockExamQuestionFeedback } from 'src/mock-exams/entities/mock-exam-question-feedback.entity';
import { Feedback } from './feedback.entity';
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
    questionFeedback: MockExamQuestionFeedback[];
    feedback: Feedback[];
    deletedAt?: Date;
    hashPassword(): Promise<void>;
    checkPassword(hashedPassword: string): Promise<boolean>;
}
