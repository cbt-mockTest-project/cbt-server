import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepComment } from 'src/zep/entities/zepComment.entity';
export declare class CreateZepCommentInput {
    userId: string;
    postId: number;
    content: string;
}
export declare class CreateZepCommentOutput extends CoreOutput {
    comment?: ZepComment;
}
