import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { MockExamQuestion } from 'src/mock-exams/entities/mock-exam-question.entity';
import { VideoService } from './video.service';
import { VideoResolver } from './video.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Video, MockExamQuestion])],
  providers: [VideoService, VideoResolver],
})
export class VideoModule {}
