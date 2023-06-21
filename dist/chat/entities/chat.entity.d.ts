import { CoreEntity } from 'src/common/entities/core.entity';
export declare class Chat extends CoreEntity {
    username: string;
    message: string;
    room: string;
    clientId: string;
}
