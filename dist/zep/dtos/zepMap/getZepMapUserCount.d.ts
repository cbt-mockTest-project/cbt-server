import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepMapUserCount } from '../../entities/zepMapUserCount.entity';
export declare class GetZepMapUserCountInput {
}
export declare class GetZepMapUserCountOutput extends CoreOutput {
    zepMapUserCount?: ZepMapUserCount[];
}
