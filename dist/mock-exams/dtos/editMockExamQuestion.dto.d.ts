import { CoreOutput } from './../../common/dtos/output.dto';
import { MockExamQuestion } from './../entities/mock-exam-question.entity';
declare const EditMockExamQuestionInput_base: import("@nestjs/common").Type<Pick<Partial<MockExamQuestion>, "question" | "solution" | "question_img" | "solution_img">>;
export declare class EditMockExamQuestionInput extends EditMockExamQuestionInput_base {
    id: number;
}
export declare class EditMockExamQuestionOutput extends CoreOutput {
}
export {};
