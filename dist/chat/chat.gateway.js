"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chat_entity_1 = require("./entities/chat.entity");
const typeorm_2 = require("typeorm");
const chat_dto_1 = require("./dtos/chat.dto");
const redis_service_1 = require("../redis/redis.service");
let ChatGateway = class ChatGateway {
    constructor(chatsRepository, redisService) {
        this.chatsRepository = chatsRepository;
        this.redisService = redisService;
    }
    afterInit(server) {
        console.log('Init');
    }
    async handleConnection(client, ...args) {
        try {
            const userName = '';
            this.redisService.hset('userNameMap', client.id, userName);
            this.server.to(client.id).emit('connected', {
                clientId: client.id,
                username: userName,
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    async handleDisconnect(client) {
        try {
            const room = await this.redisService.hget('userRoomMap', client.id);
            this.leaveRoom(client, room);
        }
        catch (e) {
            console.log(e);
        }
    }
    async handleMessage(client, payload) {
        try {
            const username = await this.redisService.hget('userNameMap', client.id);
            let newMessage = this.chatsRepository.create(Object.assign({ clientId: client.id, username }, payload));
            newMessage = await this.chatsRepository.save(newMessage);
            this.server.to(payload.room).emit('chat', newMessage);
        }
        catch (e) {
            console.log(e);
        }
    }
    async handleRoomJoin(client, payload) {
        try {
            const { room } = payload;
            this.joinRoom(client, room);
            const chatHistory = await this.chatsRepository.find({
                where: { room },
                order: { created_at: 'DESC' },
                take: 50,
            });
            this.server.to(room).emit('chatHistory', chatHistory.reverse());
        }
        catch (e) {
            console.log(e);
        }
    }
    handleRoomLeave(client, payload) {
        try {
            const { room } = payload;
            this.leaveRoom(client, room);
        }
        catch (e) {
            console.log(e);
        }
    }
    async handleSetUsername(client, username) {
        try {
            this.redisService.hset('userNameMap', client.id, username);
            this.server
                .to(client.id)
                .emit('setUsername', { clientId: client.id, username });
        }
        catch (e) {
            console.log(e);
        }
    }
    async updateRoomUserCount(room) {
        try {
            const roomUserCount = await this.redisService.hget('roomUserCount', room);
            const roomUserList = await this.redisService.smembers(`room:${room}`);
            this.server.to(room).emit('roomUserCount', roomUserCount);
            this.server.to(room).emit('roomUserList', roomUserList);
        }
        catch (e) {
            console.log(e);
        }
    }
    async leaveRoom(client, room) {
        try {
            client.leave(room);
            this.redisService.hdel('userRoomMap', client.id);
            this.redisService.hincrby('roomUserCount', room, -1);
            this.redisService.srem(`room:${room}`, client.id);
            this.updateRoomUserCount(room);
            this.server.to(room).emit('leftRoom', client.id);
        }
        catch (e) {
            console.log(e);
        }
    }
    async joinRoom(client, room) {
        try {
            client.join(room);
            this.redisService.hset('userRoomMap', client.id, room);
            this.redisService.hincrby('roomUserCount', room, 1);
            this.redisService.sadd(`room:${room}`, client.id);
            this.updateRoomUserCount(room);
            this.server.to(room).emit('joinedRoom', client.id);
        }
        catch (e) {
            console.log(e);
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('chat'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        chat_dto_1.HandleMessagePayload]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket,
        chat_dto_1.HandleRoomJoinPayload]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleRoomJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, chat_dto_1.HandleRoomLeavePayload]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleRoomLeave", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('setUsername'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleSetUsername", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(8080, {
        cors: {
            origin: [
                'http://localhost:3000',
                'https://www.moducbt.com/',
                'https://www.moducbt.com',
                'https://moducbt.com/',
            ],
            methods: ['GET', 'POST'],
            allowedHeaders: [],
            credentials: true,
        },
        transports: ['websocket'],
    }),
    __param(0, (0, typeorm_1.InjectRepository)(chat_entity_1.Chat)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        redis_service_1.RedisService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map