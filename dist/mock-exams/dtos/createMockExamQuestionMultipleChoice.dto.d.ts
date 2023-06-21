import { MockExamQuestionMultipleChoice } from './../entities/mock-exam-question-multiple-choice.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
declare const CreateMockExamQuestionMultipleChoiceInput_base: import("@nestjs/common").Type<Pick<MockExamQuestionMultipleChoice, "answer" | "options">>;
export declare class CreateMockExamQuestionMultipleChoiceInput extends CreateMockExamQuestionMultipleChoiceInput_base {
    questionId: number;
}
export declare class CreateMockExamQuestionMultipleChoiceOutput extends CoreOutput {
}
export {};
