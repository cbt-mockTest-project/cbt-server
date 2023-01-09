import { CoreOutput } from './../../common/dtos/output.dto';
import { MockExamQuestion } from './../entities/mock-exam-question.entity';
declare const DeleteMockExamQuestionInput_base: import("@nestjs/common").Type<Pick<MockExamQuestion, "id">>;
export declare class DeleteMockExamQuestionInput extends DeleteMockExamQuestionInput_base {
}
export declare class DeleteMockExamQuestionOutput extends CoreOutput {
}
export {};
