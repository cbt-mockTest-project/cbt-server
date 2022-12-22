import { CoreOutput } from './../../common/dtos/output.dto';
import { MockExamQuestionFeedback } from '../entities/mock-exam-question-feedback.entity';
declare const CreateMockExamQuestionFeedbackInput_base: import("@nestjs/common").Type<Pick<MockExamQuestionFeedback, "content">>;
export declare class CreateMockExamQuestionFeedbackInput extends CreateMockExamQuestionFeedbackInput_base {
    questionId: number;
}
export declare class CreateMockExamQuestionFeedbackOutput extends CoreOutput {
}
export {};
