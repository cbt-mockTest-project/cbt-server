import { CoreEntity } from 'src/common/entities/core.entity';
import { Role } from './role.entity';
import { User } from './user.entity';
export declare class UserAndRole extends CoreEntity {
    role: Role;
    user: User;
}
