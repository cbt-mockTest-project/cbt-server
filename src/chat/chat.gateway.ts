// events.gateway.ts
import { InjectRepository } from '@nestjs/typeorm';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import {
  HandleMessagePayload,
  HandleRoomJoinPayload,
  HandleRoomLeavePayload,
} from './dtos/chat.dto';
import { RedisService } from 'src/redis/redis.service';

@WebSocketGateway(8080, {
  cors: {
    origin:
      process.env.NODE_ENV === 'dev'
        ? 'http://localhost:3000'
        : 'https://moducbt.com', // 클라이언트의 주소를 명시적으로 지정
    methods: ['GET', 'POST'], // 허용할 HTTP 메소드 지정
    allowedHeaders: [], // 허용할 헤더들
    credentials: true,
  },
  transports: ['websocket'],
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @InjectRepository(Chat) private readonly chatsRepository: Repository<Chat>,
    private readonly redisService: RedisService,
  ) {}

  @WebSocketServer() server: Server;
  afterInit(server: Server) {
    console.log('Init');
  }

  async handleConnection(client: Socket, ...args: any[]) {
    try {
      const userName = '';
      this.redisService.hset('userNameMap', client.id, userName);
      this.server.to(client.id).emit('connected', {
        clientId: client.id,
        username: userName,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async handleDisconnect(client: Socket) {
    try {
      const room = await this.redisService.hget('userRoomMap', client.id);
      this.leaveRoom(client, room);
    } catch (e) {
      console.log(e);
    }
  }

  @SubscribeMessage('chat')
  async handleMessage(
    client: Socket,
    payload: HandleMessagePayload,
  ): Promise<void> {
    try {
      const username = await this.redisService.hget('userNameMap', client.id);
      let newMessage = this.chatsRepository.create({
        clientId: client.id,
        username,
        ...payload,
      });
      newMessage = await this.chatsRepository.save(newMessage);
      this.server.to(payload.room).emit('chat', newMessage);
    } catch (e) {
      console.log(e);
    }
  }

  @SubscribeMessage('joinRoom')
  async handleRoomJoin(
    client: Socket,
    payload: HandleRoomJoinPayload,
  ): Promise<void> {
    try {
      const { room } = payload;
      this.joinRoom(client, room);
      const chatHistory = await this.chatsRepository.find({
        where: { room },
        order: { created_at: 'DESC' },
        take: 50,
      });
      this.server.to(room).emit('chatHistory', chatHistory.reverse());
    } catch (e) {
      console.log(e);
    }
  }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, payload: HandleRoomLeavePayload): void {
    try {
      const { room } = payload;
      this.leaveRoom(client, room);
    } catch (e) {
      console.log(e);
    }
  }

  @SubscribeMessage('setUsername')
  async handleSetUsername(client: Socket, username: string): Promise<void> {
    try {
      this.redisService.hset('userNameMap', client.id, username);
      this.server
        .to(client.id)
        .emit('setUsername', { clientId: client.id, username });
    } catch (e) {
      console.log(e);
    }
  }

  private async updateRoomUserCount(room: string) {
    try {
      const roomUserCount = await this.redisService.hget('roomUserCount', room);
      const roomUserList = await this.redisService.smembers(`room:${room}`);
      this.server.to(room).emit('roomUserCount', roomUserCount);
      this.server.to(room).emit('roomUserList', roomUserList);
    } catch (e) {
      console.log(e);
    }
  }

  private async leaveRoom(client: Socket, room: string) {
    try {
      client.leave(room); // 클라이언트가 방에서 나감
      this.redisService.hdel('userRoomMap', client.id);
      this.redisService.hincrby('roomUserCount', room, -1);
      this.redisService.srem(`room:${room}`, client.id);
      this.updateRoomUserCount(room);
      this.server.to(room).emit('leftRoom', client.id);
    } catch (e) {
      console.log(e);
    }
  }

  private async joinRoom(client: Socket, room: string) {
    try {
      client.join(room);
      this.redisService.hset('userRoomMap', client.id, room);
      this.redisService.hincrby('roomUserCount', room, 1);
      this.redisService.sadd(`room:${room}`, client.id);
      this.updateRoomUserCount(room);
      this.server.to(room).emit('joinedRoom', client.id);
    } catch (e) {
      console.log(e);
    }
  }
}
