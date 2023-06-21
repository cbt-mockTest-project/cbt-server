import { PostComment } from './../entities/postComment.entity';
import { CoreOutput } from '../../common/dtos/output.dto';
declare const CreatePostCommentInput_base: import("@nestjs/common").Type<Pick<PostComment, "content">>;
export declare class CreatePostCommentInput extends CreatePostCommentInput_base {
    postId: number;
}
export declare class CreatePostCommentOutput extends CoreOutput {
    comment?: PostComment;
}
export {};
