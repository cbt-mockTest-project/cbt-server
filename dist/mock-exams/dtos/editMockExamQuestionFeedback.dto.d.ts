import { MockExamQuestionFeedback } from './../entities/mock-exam-question-feedback.entity';
import { CoreOutput } from './../../common/dtos/output.dto';
declare const EditMockExamQuestionFeedbackInput_base: import("@nestjs/common").Type<Pick<MockExamQuestionFeedback, "id" | "content">>;
export declare class EditMockExamQuestionFeedbackInput extends EditMockExamQuestionFeedbackInput_base {
}
export declare class EditMockExamQuestionFeedbackOutput extends CoreOutput {
}
export {};
