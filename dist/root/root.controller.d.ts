import { ConfigService } from '@nestjs/config';
export declare class RootController {
    private readonly configService;
    constructor(configService: ConfigService);
    getRoot(): Promise<string>;
}
