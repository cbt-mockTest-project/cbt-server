import { MockExamCategory } from './mock-exam-category.entity';
import { CoreEntity } from './../../common/entities/core.entity';
import { MockExamQuestion } from './mock-exam-question.entity';
import { MockExamQuestionState } from './mock-exam-question-state.entity';
export declare class MockExam extends CoreEntity {
    title: string;
    approved: boolean;
    mockExamCategory: MockExamCategory;
    mockExamQuestion: MockExamQuestion[];
    mockExamQuestionState: MockExamQuestionState[];
}
