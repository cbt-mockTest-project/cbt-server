import { PostCommentLikeService } from './postCommentLike.service';
import { PostCommentResolver } from './postComment.resolver';
import { PostCommentSerivce } from './postComment.service';
import { PostLikeService } from './postLike.service';
import { PostLikeResolver } from './postLike.resolver';
import { PostLike } from './entities/postLike.entity';
import { PostComment } from './entities/postComment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PostCommentLike } from './entities/postCommentLike.entity';
import { PostCommentLikeResolver } from './postCommentLike.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostComment, PostCommentLike, PostLike]),
  ],
  providers: [
    PostService,
    PostResolver,
    PostLikeResolver,
    PostLikeService,
    PostCommentSerivce,
    PostCommentResolver,
    PostCommentLikeService,
    PostCommentLikeResolver,
  ],
})
export class PostModule {}
