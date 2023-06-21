import { CoreEntity } from 'src/common/entities/core.entity';
import { ZepUser } from './zepUser.entity';
export declare class ZepStudyTime extends CoreEntity {
    grass_count: number;
    study_time: number;
    date: string;
    zepUser: ZepUser;
}
