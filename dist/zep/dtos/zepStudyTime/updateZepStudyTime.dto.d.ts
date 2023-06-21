import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepStudyTime } from 'src/zep/entities/zepStudyTime.entity';
export declare class UpdateZepStudyTimeInput {
    grassCount: number;
    studyTime: number;
    zepId: string;
    date: string;
}
export declare class UpdateZepStudyTimeOutput extends CoreOutput {
    zepStudyTime?: ZepStudyTime;
}
