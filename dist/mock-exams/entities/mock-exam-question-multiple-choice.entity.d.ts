import { MockExamQuestion } from './mock-exam-question.entity';
import { CoreEntity } from './../../common/entities/core.entity';
export declare class MockExamMultipleChoiceOption {
    image?: string;
    content: string;
    number: number;
}
export declare class MockExamQuestionMultipleChoice extends CoreEntity {
    options: MockExamMultipleChoiceOption[];
    answer: number;
    question: MockExamQuestion;
}
