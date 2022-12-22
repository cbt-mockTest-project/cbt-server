import { CoreOutput } from './../../common/dtos/output.dto';
export declare class ReadMockExamQuestionNumbersInput {
    mockExamId: number;
}
export declare class ReadMockExamQuestionNumbersOutput extends CoreOutput {
    questionNumbers?: number[];
}
