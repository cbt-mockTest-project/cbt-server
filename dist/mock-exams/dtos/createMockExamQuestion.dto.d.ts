import { CoreOutput } from './../../common/dtos/output.dto';
import { MockExamQuestion } from './../entities/mock-exam-question.entity';
declare const CreateMockExamQuestionInput_base: import("@nestjs/common").Type<Pick<MockExamQuestion, "number" | "question" | "solution" | "question_img" | "solution_img">>;
export declare class CreateMockExamQuestionInput extends CreateMockExamQuestionInput_base {
    mockExamId: number;
}
export declare class CreateMockExamQuestionOutput extends CoreOutput {
}
export {};
