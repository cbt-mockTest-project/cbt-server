import { VideoService } from './video.service';
import { CreateVideoInput, CreateVideoOutput } from './dtos/createVideo.dto';
export declare class VideoResolver {
    private readonly videoService;
    constructor(videoService: VideoService);
    createVideo(createVideoInput: CreateVideoInput): Promise<CreateVideoOutput>;
}
