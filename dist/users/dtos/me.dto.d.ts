import { User } from 'src/users/entities/user.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
export declare class MeOutput extends CoreOutput {
    user?: User;
}
