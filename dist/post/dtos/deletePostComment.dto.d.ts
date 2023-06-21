import { PostComment } from './../entities/postComment.entity';
import { CoreOutput } from '../../common/dtos/output.dto';
declare const DeletePostCommentInput_base: import("@nestjs/common").Type<Pick<PostComment, "id">>;
export declare class DeletePostCommentInput extends DeletePostCommentInput_base {
}
export declare class DeletePostCommentOutput extends CoreOutput {
}
export {};
