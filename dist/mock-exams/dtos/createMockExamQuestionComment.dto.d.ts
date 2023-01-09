import { CoreOutput } from '../../common/dtos/output.dto';
import { MockExamQuestionComment } from '../entities/mock-exam-question-comment.entity';
declare const CreateMockExamQuestionCommentInput_base: import("@nestjs/common").Type<Pick<MockExamQuestionComment, "content">>;
export declare class CreateMockExamQuestionCommentInput extends CreateMockExamQuestionCommentInput_base {
    questionId: number;
}
export declare class CreateMockExamQuestionCommentOutput extends CoreOutput {
    comment?: MockExamQuestionComment;
}
export {};
