import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
export declare class Attendance extends CoreEntity {
    content: string;
    user: User;
}
