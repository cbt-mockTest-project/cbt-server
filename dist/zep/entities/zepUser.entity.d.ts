import { CoreEntity } from 'src/common/entities/core.entity';
import { ZepStudyTime } from './zepStudyTime.entity';
import { ZepPost } from './zepPost.entity';
import { ZepComment } from './zepComment.entity';
export declare class ZepUser extends CoreEntity {
    zep_id: string;
    nickname: string;
    studyTimes: ZepStudyTime[];
    zepPost: ZepPost[];
    zepComment: ZepComment[];
}
