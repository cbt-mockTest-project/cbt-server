import { CoreOutput } from 'src/common/dtos/output.dto';
import { Video } from '../entities/video.entity';
declare const CreateVideoInput_base: import("@nestjs/common").Type<Pick<Video, "url" | "size">>;
export declare class CreateVideoInput extends CreateVideoInput_base {
}
export declare class CreateVideoOutput extends CoreOutput {
}
export {};
