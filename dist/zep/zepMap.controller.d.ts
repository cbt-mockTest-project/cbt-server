import { ZepMapService } from './zepMap.service';
import { GetZepMapUserCountOutput } from './dtos/zepMap/getZepMapUserCount';
import { UpdateZepMapUserCountInput, UpdateZepMapUserCountOutput } from './dtos/zepMap/updateZepMapUserCount';
export declare class ZepMapController {
    private readonly zepMapService;
    constructor(zepMapService: ZepMapService);
    getZepMapUserCount(): Promise<GetZepMapUserCountOutput>;
    updateZepMapUserCount(updateZepMapUserCountInpt: UpdateZepMapUserCountInput): Promise<UpdateZepMapUserCountOutput>;
}
