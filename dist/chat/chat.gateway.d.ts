import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { HandleMessagePayload, HandleRoomJoinPayload, HandleRoomLeavePayload } from './dtos/chat.dto';
import { RedisService } from 'src/redis/redis.service';
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly chatsRepository;
    private readonly redisService;
    constructor(chatsRepository: Repository<Chat>, redisService: RedisService);
    server: Server;
    afterInit(server: Server): void;
    handleConnection(client: Socket, ...args: any[]): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    handleMessage(client: Socket, payload: HandleMessagePayload): Promise<void>;
    handleRoomJoin(client: Socket, payload: HandleRoomJoinPayload): Promise<void>;
    handleRoomLeave(client: Socket, payload: HandleRoomLeavePayload): void;
    handleSetUsername(client: Socket, username: string): Promise<void>;
    private updateRoomUserCount;
    private leaveRoom;
    private joinRoom;
}
