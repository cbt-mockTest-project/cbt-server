import { ZepUser } from './entities/zepUser.entity';
import { Repository } from 'typeorm';
import { ZepStudyTime } from './entities/zepStudyTime.entity';
import { UpdateZepStudyTimeInput, UpdateZepStudyTimeOutput } from './dtos/zepStudyTime/updateZepStudyTime.dto';
export declare class ZepStudyTimeService {
    private readonly zepUser;
    private readonly zepStudyTime;
    constructor(zepUser: Repository<ZepUser>, zepStudyTime: Repository<ZepStudyTime>);
    updateZepStudyTime(updateZepStudyTimeInput: UpdateZepStudyTimeInput): Promise<UpdateZepStudyTimeOutput>;
}
