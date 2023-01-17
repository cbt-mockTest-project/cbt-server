import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostService, PostResolver],
})
export class PostModule {}
