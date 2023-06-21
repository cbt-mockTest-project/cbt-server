import { ExamCoAuthor } from './../../exam-co-author/entities/exam-co-author.entity';
import { User } from 'src/users/entities/user.entity';
import { MockExamCategory } from './mock-exam-category.entity';
import { CoreEntity } from './../../common/entities/core.entity';
import { MockExamQuestion } from './mock-exam-question.entity';
import { MockExamQuestionState } from './mock-exam-question-state.entity';
import { MockExamHistory } from './mock-exam-history';
export declare enum ExamStatus {
    UNSET = "UNSET",
    REQUEST = "REQUEST",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}
export declare class MockExam extends CoreEntity {
    title: string;
    slug: string;
    approved: boolean;
    mockExamCategory: MockExamCategory;
    mockExamQuestion: MockExamQuestion[];
    mockExamQuestionState: MockExamQuestionState[];
    history: MockExamHistory[];
    examCoAuthor: ExamCoAuthor[];
    user: User;
    status: ExamStatus;
    order: number;
}
