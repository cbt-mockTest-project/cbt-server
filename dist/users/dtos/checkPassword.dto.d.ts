import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from 'src/users/entities/user.entity';
declare const CheckPasswordInput_base: import("@nestjs/common").Type<Pick<User, "password">>;
export declare class CheckPasswordInput extends CheckPasswordInput_base {
}
export declare class CheckPasswordOutput extends CoreOutput {
}
export {};
