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

@WebSocketGateway(8080, {
  cors: {
    origin: 'http://localhost:3000', // 클라이언트의 주소를 명시적으로 지정
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
  ) {}

  @WebSocketServer() server: Server;
  roomUserCount: { [clientId: string]: number } = {};
  userRoomMap: { [clientId: string]: string } = {};
  userNameMap: { [clientId: string]: string } = {};

  afterInit(server: Server) {
    console.log('Init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.userNameMap[client.id] = `수험생#${client.id.slice(0, 5)}`;
    this.server.to(client.id).emit('connected', {
      clientId: client.id,
      username: this.userNameMap[client.id],
    });
  }

  handleDisconnect(client: Socket) {
    const room = this.userRoomMap[client.id];
    this.leaveRoom(client, room);
  }

  @SubscribeMessage('chat')
  async handleMessage(
    client: Socket,
    payload: HandleMessagePayload,
  ): Promise<void> {
    const username = this.userNameMap[client.id];
    let newMessage = this.chatsRepository.create({
      clientId: client.id,
      username,
      ...payload,
    });
    newMessage = await this.chatsRepository.save(newMessage);
    this.server.to(payload.room).emit('chat', newMessage);
  }

  @SubscribeMessage('joinRoom')
  async handleRoomJoin(
    client: Socket,
    payload: HandleRoomJoinPayload,
  ): Promise<void> {
    const { room } = payload;
    this.joinRoom(client, room);
    const chatHistory = await this.chatsRepository.find({
      where: { room },
      order: { created_at: 'DESC' },
      take: 50,
    });
    this.server.to(room).emit('chatHistory', chatHistory.reverse());
  }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, payload: HandleRoomLeavePayload): void {
    const { room } = payload;
    this.leaveRoom(client, room);
  }

  @SubscribeMessage('setUsername')
  handleSetUsername(client: Socket, username: string): void {
    console.log(username);
    this.userNameMap[client.id] = username; // Set the username for the client
  }

  private updateRoomUserCount(room: string) {
    this.roomUserCount = Object.values(this.userRoomMap).reduce((acc, cur) => {
      acc[cur] = (acc[cur] || 0) + 1;
      return acc;
    }, {});
    this.server.to(room).emit('roomUserCount', this.roomUserCount);
    this.server.to(room).emit(
      'roomUserList',
      Object.keys(this.userRoomMap)
        .filter((key) => this.userRoomMap[key] === room)
        .map((clientId) => this.userNameMap[clientId]),
    );
  }

  private leaveRoom(client: Socket, room: string) {
    client.leave(room); // 클라이언트가 방에서 나감
    delete this.userRoomMap[client.id]; // 클라이언트가 접속한 방 삭제
    this.updateRoomUserCount(room);
    this.server.to(room).emit('leftRoom', client.id);
  }

  private joinRoom(client: Socket, room: string) {
    client.join(room); // 클라이언트가 방에 접속
    this.userRoomMap[client.id] = room; // 클라이언트가 접속한 방 저장
    this.updateRoomUserCount(room);
    this.server.to(room).emit('joinedRoom', client.id);
  }
}
