import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepMapUserCount } from 'src/zep/entities/zepMapUserCount.entity';
declare const UpdateZepMapUserCountInput_base: import("@nestjs/common").Type<Pick<ZepMapUserCount, "mapId" | "userCount">>;
export declare class UpdateZepMapUserCountInput extends UpdateZepMapUserCountInput_base {
}
export declare class UpdateZepMapUserCountOutput extends CoreOutput {
    zepMapUserCount?: ZepMapUserCount;
}
export {};
