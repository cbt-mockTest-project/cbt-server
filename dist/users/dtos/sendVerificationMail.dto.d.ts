import { CoreOutput } from './../../common/dtos/output.dto';
import { Verification } from './../entities/verification.entity';
declare const SendVerificationMailInput_base: import("@nestjs/common").Type<Pick<Verification, "email">>;
export declare class SendVerificationMailInput extends SendVerificationMailInput_base {
}
export declare class SendVerificationMailOutput extends CoreOutput {
}
export {};
