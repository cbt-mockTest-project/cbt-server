import { UpdateZepStudyTimeInput, UpdateZepStudyTimeOutput } from './dtos/zepStudyTime/updateZepStudyTime.dto';
import { ZepStudyTimeService } from './zepStudyTime.service';
export declare class ZepStudyTimeController {
    private readonly zepStudyTimeService;
    constructor(zepStudyTimeService: ZepStudyTimeService);
    updateZepStudyTime(updateZepStudyTimeInput: UpdateZepStudyTimeInput): Promise<UpdateZepStudyTimeOutput>;
}
