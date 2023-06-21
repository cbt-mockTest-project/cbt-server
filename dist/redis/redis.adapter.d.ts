import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { RedisService } from './redis.service';
export declare class RedisIoAdapter extends IoAdapter {
    private readonly redisService;
    constructor(redisService: RedisService);
    private adapterConstructor;
    connectToRedis(): Promise<void>;
    createIOServer(port: number, options?: ServerOptions): any;
}
