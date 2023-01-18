import { PostComment } from './entities/postComment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PostCommentLike } from './entities/postCommentLike.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostComment, PostCommentLike])],
  providers: [PostService, PostResolver],
})
export class PostModule {}
