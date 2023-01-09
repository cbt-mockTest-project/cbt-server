import { CoreOutput } from './../../common/dtos/output.dto';
import { User } from './../entities/user.entity';
declare const RegisterInput_base: import("@nestjs/common").Type<Pick<User, "nickname" | "password">>;
export declare class RegisterInput extends RegisterInput_base {
    code: string;
}
export declare class RegisterOutput extends CoreOutput {
}
export {};
