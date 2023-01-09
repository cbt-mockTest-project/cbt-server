import { CoreOutput } from './../../common/dtos/output.dto';
import { MockExamCategory } from './../entities/mock-exam-category.entity';
declare const DeleteMockExamCategoryInput_base: import("@nestjs/common").Type<Pick<MockExamCategory, "id">>;
export declare class DeleteMockExamCategoryInput extends DeleteMockExamCategoryInput_base {
}
export declare class DeleteMockExamCategoryOutput extends CoreOutput {
}
export {};
