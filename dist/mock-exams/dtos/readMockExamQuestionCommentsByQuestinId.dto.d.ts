import { MockExamQuestionComment } from './../entities/mock-exam-question-comment.entity';
import { CoreOutput } from './../../common/dtos/output.dto';
export declare class ReadMockExamQuestionCommentsByQuestionIdInput {
    questionId: number;
}
export declare class ReadMockExamQuestionCommentsByQuestionIdOutput extends CoreOutput {
    comments?: MockExamQuestionComment[];
}
