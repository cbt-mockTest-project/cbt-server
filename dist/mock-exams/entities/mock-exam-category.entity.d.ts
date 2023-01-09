import { MockExam } from './mock-exam.entity';
import { CoreEntity } from '../../common/entities/core.entity';
export declare class MockExamCategory extends CoreEntity {
    name: string;
    mockExam: MockExam[];
}
