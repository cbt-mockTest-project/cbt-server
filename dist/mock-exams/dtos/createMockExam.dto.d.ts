import { MockExam } from './../entities/mock-exam.entity';
import { CoreOutput } from './../../common/dtos/output.dto';
declare const CreateMockExamInput_base: import("@nestjs/common").Type<Pick<MockExam, "title">>;
export declare class CreateMockExamInput extends CreateMockExamInput_base {
    categoryName: string;
}
export declare class CreateMockExamOutput extends CoreOutput {
}
export {};
