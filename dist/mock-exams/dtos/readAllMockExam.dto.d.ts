import { MockExam } from './../entities/mock-exam.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
export declare class ReadAllMockExamsInput {
    query?: string;
    category?: string;
    all?: boolean;
}
export declare class ReadAllMockExamsOutput extends CoreOutput {
    mockExams?: MockExam[];
}
