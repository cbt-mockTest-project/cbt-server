import { PostComment } from './../entities/postComment.entity';
import { CoreOutput } from '../../common/dtos/output.dto';
declare const EditPostCommentInput_base: import("@nestjs/common").Type<Pick<PostComment, "id" | "content">>;
export declare class EditPostCommentInput extends EditPostCommentInput_base {
}
export declare class EditPostCommentOutput extends CoreOutput {
}
export {};
