import { MockExamQuestion } from './../entities/mock-exam-question.entity';
import { CoreOutput } from './../../common/dtos/output.dto';
export declare class ReadAllMockExamQuestionOutput extends CoreOutput {
    mockExamQuestions?: MockExamQuestion[];
}
