import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from 'src/users/entities/user.entity';
declare const EditProfileInput_base: import("@nestjs/common").Type<Pick<Partial<User>, "nickname" | "password">>;
export declare class EditProfileInput extends EditProfileInput_base {
}
export declare class EditProfileOutput extends CoreOutput {
}
export {};
