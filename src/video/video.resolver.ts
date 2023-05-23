import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Video } from './entities/video.entity';
import { VideoService } from './video.service';
import { CreateVideoInput, CreateVideoOutput } from './dtos/createVideo.dto';
import { Role } from 'src/auth/role.decorators';

@Resolver(() => Video)
export class VideoResolver {
  constructor(private readonly videoService: VideoService) {}

  @Role(['ADMIN'])
  @Mutation(() => CreateVideoOutput)
  async createVideo(
    @Args('input') createVideoInput: CreateVideoInput,
  ): Promise<CreateVideoOutput> {
    return this.videoService.createVideo(createVideoInput);
  }
}
