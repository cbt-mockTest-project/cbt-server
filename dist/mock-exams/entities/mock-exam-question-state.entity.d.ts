import { MockExamQuestion } from './mock-exam-question.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import { MockExam } from './mock-exam.entity';
export declare enum QuestionState {
    ROW = "ROW",
    MIDDLE = "MIDDLE",
    HIGH = "HIGH",
    CORE = "CORE"
}
export declare class MockExamQuestionState extends CoreEntity {
    state: QuestionState;
    answer: string;
    question: MockExamQuestion;
    user: User;
    exam: MockExam;
}
