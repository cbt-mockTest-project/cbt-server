import { CoreOutput } from './../../common/dtos/output.dto';
import { MockExamCategory } from './../entities/mock-exam-category.entity';
declare const CreateMockExamCategoryInput_base: import("@nestjs/common").Type<Pick<MockExamCategory, "name">>;
export declare class CreateMockExamCategoryInput extends CreateMockExamCategoryInput_base {
}
export declare class CreateMockExamCategoryOutput extends CoreOutput {
}
export {};
