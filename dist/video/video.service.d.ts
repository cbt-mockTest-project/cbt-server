import { Video } from './entities/video.entity';
import { Repository } from 'typeorm';
import { CreateVideoInput, CreateVideoOutput } from './dtos/createVideo.dto';
export declare class VideoService {
    private readonly videos;
    constructor(videos: Repository<Video>);
    createVideo(createVideoInput: CreateVideoInput): Promise<CreateVideoOutput>;
}
