import { User } from 'src/users/entities/user.entity';
import { EditPostInput } from './dtos/editPost.dto';
import { Post } from './entities/post.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostLike } from './entities/postLike.entity';
import { EditPostLikeOutput, EditPostLikeInput } from './dtos/editPostLike.dto';

@Injectable()
export class PostLikeService {
  constructor(
    @InjectRepository(PostLike)
    private readonly postLike: Repository<PostLike>,
    @InjectRepository(Post)
    private readonly post: Repository<Post>,
  ) {}

  async editPostLike(
    editPostLikeInput: EditPostLikeInput,
    user: User,
  ): Promise<EditPostLikeOutput> {
    try {
      const { postId } = editPostLikeInput;
      const post = await this.post.findOne({
        where: {
          id: postId,
        },
      });
      if (!post) {
        return {
          ok: false,
          error: '존재하지 않는 댓글입니다.',
        };
      }
      const prevLike = await this.postLike.findOne({
        where: {
          user: {
            id: user.id,
          },
          post: {
            id: postId,
          },
        },
      });
      if (prevLike) {
        await this.postLike.delete({ id: prevLike.id });
        return {
          ok: true,
          currentState: false,
        };
      }
      const newLike = this.postLike.create({
        user,
        post,
      });
      await this.postLike.save(newLike);
      return {
        ok: true,
        currentState: true,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: '좋아요 요청에 실패했습니다.',
      };
    }
  }
}
