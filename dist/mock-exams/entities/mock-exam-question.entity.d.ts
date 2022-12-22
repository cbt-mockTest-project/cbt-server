import { MockExam } from './mock-exam.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { MockExamQuestionFeedback } from './mock-exam-question-feedback.entity';
import { MockExamQuestionState } from './mock-exam-question-state.entity';
export declare class MockExamImageType {
    url: string;
    name: string;
    uid: string;
}
export declare class MockExamQuestion extends CoreEntity {
    question: string;
    solution: string;
    approved: boolean;
    question_img: MockExamImageType[];
    solution_img: MockExamImageType[];
    mockExam: MockExam;
    mockExamId: number;
    mockExamQuestionFeedback: MockExamQuestionFeedback[];
    state: MockExamQuestionState[];
    number: number;
}
