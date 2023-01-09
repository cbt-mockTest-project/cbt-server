import { MockExamQuestion } from './../entities/mock-exam-question.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
export declare class ReadMockExamQuestionBookmarkInput {
    examId: number;
}
export declare class ReadMockExamQuestionBookmarkOutput extends CoreOutput {
    questions?: MockExamQuestion[];
}
