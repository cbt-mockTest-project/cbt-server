import { CoreOutput } from '../../common/dtos/output.dto';
export declare class EditPostCommentLikeInput {
    commentId: number;
}
export declare class EditPostCommentLikeOutput extends CoreOutput {
    currentState?: boolean;
}
