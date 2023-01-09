import { MockExam } from './../entities/mock-exam.entity';
import { CoreOutput } from './../../common/dtos/output.dto';
export declare class SearchMockExamInput {
    query: string;
}
export declare class SearchMockExamOutput extends CoreOutput {
    mockExams?: MockExam[];
    totalResults?: number;
}
