import { CoreOutput } from './../../common/dtos/output.dto';
import { Verification } from '../entities/verification.entity';
declare const EmailVerificationInput_base: import("@nestjs/common").Type<Pick<Verification, "code">>;
export declare class EmailVerificationInput extends EmailVerificationInput_base {
}
export declare class EmailVerificationOutput extends CoreOutput {
    email?: string;
}
export {};
