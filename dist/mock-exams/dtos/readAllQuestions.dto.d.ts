import { MockExamQuestion } from './../entities/mock-exam-question.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
export declare class ReadAllQuestionsOutput extends CoreOutput {
    questions?: MockExamQuestion[];
}
