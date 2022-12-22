import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExamCategory } from '../entities/mock-exam-category.entity';
declare const EditMockExamCategoryInput_base: import("@nestjs/common").Type<Pick<MockExamCategory, "id" | "name">>;
export declare class EditMockExamCategoryInput extends EditMockExamCategoryInput_base {
}
export declare class EditMockExamCategoryOutput extends CoreOutput {
}
export {};
