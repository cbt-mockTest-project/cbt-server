import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExamCategory } from '../entities/mock-exam-category.entity';
declare class ExamTitleAndId {
    id: number;
    title: string;
}
declare const ReadMockExamTitlesByCateoryInput_base: import("@nestjs/common").Type<Pick<MockExamCategory, "name">>;
export declare class ReadMockExamTitlesByCateoryInput extends ReadMockExamTitlesByCateoryInput_base {
}
export declare class ReadMockExamTitlesByCateoryOutput extends CoreOutput {
    titles?: ExamTitleAndId[];
}
export {};
