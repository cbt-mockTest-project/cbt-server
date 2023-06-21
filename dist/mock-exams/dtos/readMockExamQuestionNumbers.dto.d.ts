import { CoreOutput } from './../../common/dtos/output.dto';
import { ExamStatus } from '../entities/mock-exam.entity';
export declare class QuestionNumber {
    questionNumber: number;
    questionId: number;
}
export declare class ReadMockExamQuestionNumbersInput {
    mockExamId: number;
}
export declare class ReadMockExamQuestionNumbersOutput extends CoreOutput {
    questionNumbers?: QuestionNumber[];
    examStatus?: ExamStatus;
}
