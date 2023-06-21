import { Repository } from 'typeorm';
import { ZepMapUserCount } from './entities/zepMapUserCount.entity';
import { GetZepMapUserCountOutput } from './dtos/zepMap/getZepMapUserCount';
import { UpdateZepMapUserCountInput, UpdateZepMapUserCountOutput } from './dtos/zepMap/updateZepMapUserCount';
export declare class ZepMapService {
    private readonly zepMapUserCount;
    constructor(zepMapUserCount: Repository<ZepMapUserCount>);
    getZepMapUserCount(): Promise<GetZepMapUserCountOutput>;
    updateZepMapUserCount(updateZepMapUserCountInput: UpdateZepMapUserCountInput): Promise<UpdateZepMapUserCountOutput>;
}
