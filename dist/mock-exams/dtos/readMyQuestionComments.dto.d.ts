import { MockExamQuestion } from 'src/mock-exams/entities/mock-exam-question.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
export declare class ReadMyQuestionCommentsInput {
    examId: number;
}
export declare class ReadMyQuestionCommentsOutput extends CoreOutput {
    questions?: MockExamQuestion[];
}
