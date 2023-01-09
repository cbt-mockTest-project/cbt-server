import { CoreOutput } from './../../common/dtos/output.dto';
import { MockExam } from './../entities/mock-exam.entity';
declare const DeleteMockExamInput_base: import("@nestjs/common").Type<Pick<MockExam, "id">>;
export declare class DeleteMockExamInput extends DeleteMockExamInput_base {
}
export declare class DeleteMockExamOutput extends CoreOutput {
}
export {};
