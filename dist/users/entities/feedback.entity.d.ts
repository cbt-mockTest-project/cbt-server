import { User } from 'src/users/entities/user.entity';
import { CoreEntity } from './../../common/entities/core.entity';
export declare class Feedback extends CoreEntity {
    content: string;
    user: User;
}
