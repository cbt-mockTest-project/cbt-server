import { OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
export declare class RedisService extends Redis implements OnModuleInit {
    constructor();
    onModuleInit(): void;
}
