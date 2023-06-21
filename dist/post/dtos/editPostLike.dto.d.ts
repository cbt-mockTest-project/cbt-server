import { CoreOutput } from './../../common/dtos/output.dto';
export declare class EditPostLikeInput {
    postId: number;
}
export declare class EditPostLikeOutput extends CoreOutput {
    currentState?: boolean;
}
