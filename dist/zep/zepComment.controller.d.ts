import { ZepCommentService } from './zepComment.service';
import { CreateZepCommentInput } from './dtos/zepComment/createZepComment.dto';
import { UpdateZepCommentInput } from './dtos/zepComment/updateZepComment.dto';
import { DeleteZepCommentInput } from './dtos/zepComment/deleteZepComment.dto';
export declare class ZepCommentController {
    private readonly zepCommentService;
    constructor(zepCommentService: ZepCommentService);
    createZepComment(createZepCommentInput: CreateZepCommentInput): Promise<import("./dtos/zepComment/createZepComment.dto").CreateZepCommentOutput>;
    updateZepComment(updateZepCommentInput: UpdateZepCommentInput, id: string): Promise<import("./dtos/zepComment/updateZepComment.dto").UpdateZepCommentOutput>;
    deleteZepComment(id: string, deleteZepCommentInput: DeleteZepCommentInput): Promise<import("./dtos/zepComment/deleteZepComment.dto").DeleteZepCommentOutput>;
}
