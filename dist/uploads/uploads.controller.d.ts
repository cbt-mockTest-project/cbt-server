import { ConfigService } from '@nestjs/config';
import { UploadInput } from './uploads.dto';
export declare class UploadsController {
    private readonly configService;
    constructor(configService: ConfigService);
    uploadFile(uploadInput: UploadInput, file: any): Promise<{
        url: string;
    }>;
}
