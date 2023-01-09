import { CoreOutput } from './../../common/dtos/output.dto';
import { Verification } from './../entities/verification.entity';
declare const SendFindPasswordMailInput_base: import("@nestjs/common").Type<Pick<Verification, "email">>;
export declare class SendFindPasswordMailInput extends SendFindPasswordMailInput_base {
}
export declare class SendFindPasswordMailOutput extends CoreOutput {
}
export {};
