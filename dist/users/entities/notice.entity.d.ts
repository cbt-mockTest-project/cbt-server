import { User } from 'src/users/entities/user.entity';
import { CoreEntity } from '../../common/entities/core.entity';
export declare class Notice extends CoreEntity {
    content: string;
    confirm: boolean;
    reservationTime?: Date;
    link?: string;
    user: User;
}
