import { ConfigService } from '@nestjs/config';
export declare class UploadsController {
    private readonly configService;
    constructor(configService: ConfigService);
    uploadFile(file: any): Promise<{
        url: string;
    }>;
}
