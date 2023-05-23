import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { Repository } from 'typeorm';
import { CreateVideoInput, CreateVideoOutput } from './dtos/createVideo.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videos: Repository<Video>,
  ) {}

  async createVideo(
    createVideoInput: CreateVideoInput,
  ): Promise<CreateVideoOutput> {
    try {
      await this.videos.save(this.videos.create(createVideoInput));
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: '동영상을 생성할 수 없습니다.',
      };
    }
  }
}
