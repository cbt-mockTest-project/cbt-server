import { CoreEntity } from 'src/common/entities/core.entity';
import { ZepPost } from './zepPost.entity';
import { ZepUser } from './zepUser.entity';
export declare class ZepComment extends CoreEntity {
    content: string;
    zepPost: ZepPost;
    zepUser: ZepUser;
}
