import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepComment } from 'src/zep/entities/zepComment.entity';
export declare class UpdateZepCommentInput {
    content?: string;
    userId: string;
}
export declare class UpdateZepCommentOutput extends CoreOutput {
    comment?: ZepComment;
}
