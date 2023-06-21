import { ZepComment } from './entities/zepComment.entity';
import { Repository } from 'typeorm';
import { ZepPost } from './entities/zepPost.entity';
import { ZepUser } from './entities/zepUser.entity';
import { CreateZepCommentInput, CreateZepCommentOutput } from './dtos/zepComment/createZepComment.dto';
import { DeleteZepCommentInput, DeleteZepCommentOutput } from './dtos/zepComment/deleteZepComment.dto';
import { UpdateZepCommentInput, UpdateZepCommentOutput } from './dtos/zepComment/updateZepComment.dto';
export declare class ZepCommentService {
    private readonly zepComment;
    private readonly zepPost;
    private readonly zepUser;
    constructor(zepComment: Repository<ZepComment>, zepPost: Repository<ZepPost>, zepUser: Repository<ZepUser>);
    createZepComment(createZepCommentInput: CreateZepCommentInput): Promise<CreateZepCommentOutput>;
    deleteZepComment(commentId: string, deleteZepCommentInput: DeleteZepCommentInput): Promise<DeleteZepCommentOutput>;
    updateZepComment(commentId: string, updateZepCommentInput: UpdateZepCommentInput): Promise<UpdateZepCommentOutput>;
}
