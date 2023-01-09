import { CoreOutput } from './../../common/dtos/output.dto';
import { MockExamQuestionState, QuestionState } from './../entities/mock-exam-question-state.entity';
declare const CreateOrUpdateMockExamQuestionStateInput_base: import("@nestjs/common").Type<Pick<MockExamQuestionState, "state">>;
export declare class CreateOrUpdateMockExamQuestionStateInput extends CreateOrUpdateMockExamQuestionStateInput_base {
    questionId: number;
}
export declare class CreateOrUpdateMockExamQuestionStateOutput extends CoreOutput {
    message?: string;
    currentState?: QuestionState;
}
export {};
