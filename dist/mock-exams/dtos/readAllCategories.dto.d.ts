import { MockExamCategory } from './../entities/mock-exam-category.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
declare const ReadAllMockExamCategoriesInput_base: import("@nestjs/common").Type<Partial<Pick<MockExamCategory, keyof MockExamCategory>>>;
export declare class ReadAllMockExamCategoriesInput extends ReadAllMockExamCategoriesInput_base {
    partnerId?: number;
}
export declare class ReadAllMockExamCategoriesOutput extends CoreOutput {
    categories?: MockExamCategory[];
}
export {};
