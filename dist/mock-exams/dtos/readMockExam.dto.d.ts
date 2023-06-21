import { MockExam } from './../entities/mock-exam.entity';
import { CoreOutput } from './../../common/dtos/output.dto';
export declare class ReadMockExamInput {
    id: number;
}
export declare class ReadMockExamOutput extends CoreOutput {
    mockExam?: MockExam;
    questionNumbers?: number[];
}
