import { MockExamQuestionComment } from '../entities/mock-exam-question-comment.entity';
import { CoreOutput } from '../../common/dtos/output.dto';
declare const EditMockExamQuestionCommentInput_base: import("@nestjs/common").Type<Pick<MockExamQuestionComment, "id" | "content">>;
export declare class EditMockExamQuestionCommentInput extends EditMockExamQuestionCommentInput_base {
}
export declare class EditMockExamQuestionCommentOutput extends CoreOutput {
}
export {};
