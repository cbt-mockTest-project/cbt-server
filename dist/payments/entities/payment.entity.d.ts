import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
export declare class Payment extends CoreEntity {
    orderId: string;
    price: number;
    productName: string;
    receiptId: string;
    receiptUrl: string;
    user: User;
}
