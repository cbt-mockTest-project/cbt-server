import { MockExamCategory } from './../entities/mock-exam-category.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
export declare class ReadMyMockExamCategoriesOutput extends CoreOutput {
    categories?: MockExamCategory[];
}
