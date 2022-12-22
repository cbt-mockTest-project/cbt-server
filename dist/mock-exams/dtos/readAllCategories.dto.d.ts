import { MockExamCategory } from './../entities/mock-exam-category.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
export declare class ReadAllMockExamCategoriesOutput extends CoreOutput {
    categories?: MockExamCategory[];
}
