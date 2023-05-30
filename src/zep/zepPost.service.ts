import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ZepPost } from './entities/zepPost.entity';
import { Repository } from 'typeorm';
import { ZepUser } from './entities/zepUser.entity';
import {
  CreateZepPostInput,
  CreateZepPostOutput,
} from './dtos/zepPost/createZepPost.dto';
import {
  GetZepPostsInput,
  GetZepPostsOutput,
} from './dtos/zepPost/getZepPosts.dto';
import { GetZepPostOutput } from './dtos/zepPost/getZepPost.dto';
import {
  UpdateZepPostInput,
  UpdateZepPostOutput,
} from './dtos/zepPost/updateZepPost.dto';
import {
  DeleteZepPostInput,
  DeleteZepPostOutput,
} from './dtos/zepPost/deleteZepPost.dto';

@Injectable()
export class ZepPostService {
  constructor(
    @InjectRepository(ZepPost)
    private readonly zepPost: Repository<ZepPost>,
    @InjectRepository(ZepUser)
    private readonly zepUser: Repository<ZepUser>,
  ) {}

  async createZepPost(
    createZepPostInput: CreateZepPostInput,
  ): Promise<CreateZepPostOutput> {
    const { userId, title, content, category } = createZepPostInput;
    try {
      const zepUser = await this.zepUser.findOne({
        where: { zep_id: userId },
      });
      if (!zepUser) {
        return {
          ok: false,
          error: '존재하지 않는 유저입니다.',
        };
      }
      const post = this.zepPost.create({
        title,
        content,
        category,
        zepUser,
      });
      await this.zepPost.save(post);
      return {
        ok: true,
        post,
      };
    } catch (e) {
      return {
        ok: false,
        error: e.message,
      };
    }
  }

  async getZepPosts(
    getZepPostsInput: GetZepPostsInput,
  ): Promise<GetZepPostsOutput> {
    const { category, limit, page } = getZepPostsInput;
    const skip = (Number(page) - 1) * Number(limit);
    try {
      const posts = await this.zepPost.find({
        where: { category },
        skip,
        take: Number(limit),
        order: { created_at: 'DESC' },
        relations: {
          zepUser: true,
          zepComment: true,
        },
      });
      return {
        ok: true,
        posts,
      };
    } catch (e) {
      return {
        ok: false,
        error: e.message,
      };
    }
  }

  async getZepPost(postId: string): Promise<GetZepPostOutput> {
    try {
      const post = await this.zepPost.findOne({
        where: { id: Number(postId) },
        relations: {
          zepUser: true,
          zepComment: true,
        },
      });
      if (!post) {
        return {
          ok: false,
          error: '존재하지 않는 게시글입니다.',
        };
      }
      return {
        ok: true,
        post,
      };
    } catch (e) {
      return {
        ok: false,
        error: e.message,
      };
    }
  }

  async updateZepPost(
    postId: string,
    updateZepPostInput: UpdateZepPostInput,
  ): Promise<UpdateZepPostOutput> {
    const { title, content, category, userId } = updateZepPostInput;
    try {
      const post = await this.zepPost.findOne({
        where: { id: Number(postId) },
        relations: {
          zepUser: true,
        },
      });
      if (!post) {
        return {
          ok: false,
          error: '존재하지 않는 게시글입니다.',
        };
      }
      if (post.zepUser.zep_id !== userId) {
        return {
          ok: false,
          error: '수정 권한이 없습니다.',
        };
      }
      if (title) {
        post.title = title;
      }
      if (content) {
        post.content = content;
      }
      if (category) {
        post.category = category;
      }
      await this.zepPost.save(post);
      return {
        ok: true,
        post,
      };
    } catch (e) {
      return {
        ok: false,
        error: e.message,
      };
    }
  }

  async deleteZepPost(
    postId: string,
    deleteZepPostInput: DeleteZepPostInput,
  ): Promise<DeleteZepPostOutput> {
    try {
      const { userId } = deleteZepPostInput;
      const post = await this.zepPost.findOne({
        where: { id: Number(postId) },
        relations: {
          zepUser: true,
        },
      });
      if (!post) {
        return {
          ok: false,
          error: '존재하지 않는 게시글입니다.',
        };
      }
      if (post.zepUser.zep_id !== userId) {
        return {
          ok: false,
          error: '삭제 권한이 없습니다.',
        };
      }
      await this.zepPost.delete(Number(postId));
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: e.message,
      };
    }
  }
}
