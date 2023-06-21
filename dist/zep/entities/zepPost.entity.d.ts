import { CoreEntity } from 'src/common/entities/core.entity';
import { ZepUser } from './zepUser.entity';
import { ZepComment } from './zepComment.entity';
export declare enum ZepPostCategory {
    FREE = "FREE",
    STUDY = "STUDY",
    NOTICE = "NOTICE",
    FEEDBACK = "FEEDBACK",
    ALGORISM = "ALGORISM",
    PROJECT = "PROJECT"
}
export declare class ZepPost extends CoreEntity {
    title: string;
    content: string;
    zepUser: ZepUser;
    zepComment: ZepComment[];
    category: ZepPostCategory;
}
