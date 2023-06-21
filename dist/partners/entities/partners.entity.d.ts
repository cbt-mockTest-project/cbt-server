import { CoreEntity } from 'src/common/entities/core.entity';
import { MockExamCategory } from 'src/mock-exams/entities/mock-exam-category.entity';
export declare class Partner extends CoreEntity {
    name: string;
    examCategory: MockExamCategory[];
}
