import { CoreOutput } from './../../common/dtos/output.dto';
import { User } from './../entities/user.entity';
declare const UserProfileInput_base: import("@nestjs/common").Type<Pick<User, "id">>;
export declare class UserProfileInput extends UserProfileInput_base {
}
export declare class UserProfileOutput extends CoreOutput {
    user?: User;
}
export {};
