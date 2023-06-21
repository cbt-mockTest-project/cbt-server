import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExam } from '../entities/mock-exam.entity';
export declare class ReadMyExamHistoryOutput extends CoreOutput {
    mockExams?: MockExam[];
}
