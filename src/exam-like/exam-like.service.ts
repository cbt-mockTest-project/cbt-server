import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import {
  ToggleExamLikeInput,
  ToggleExamLikeOutput,
} from './dtos/toggleExamLike.dto';
import { ExamLike } from './entities/exam-like.entity';

@Injectable()
export class ExamLikeService {
  constructor(
    @InjectRepository(ExamLike)
    private readonly examLike: Repository<ExamLike>,
  ) {}

  async toggleExamLike(
    user: User,
    toggleExamLikeInput: ToggleExamLikeInput,
  ): Promise<ToggleExamLikeOutput> {
    try {
      const { examId } = toggleExamLikeInput;
      const like = await this.examLike.findOne({
        where: {
          exam: {
            id: examId,
          },
          user: {
            id: user.id,
          },
        },
      });
      if (like) {
        await this.examLike.delete({
          exam: {
            id: examId,
          },
          user: {
            id: user.id,
          },
        });
      } else {
        await this.examLike.save(
          this.examLike.create({
            exam: {
              id: examId,
            },
            user: {
              id: user.id,
            },
          }),
        );
      }
      return {
        ok: true,
        isLiked: !like,
      };
    } catch (error) {
      return {
        ok: false,
        error: '좋아요를 토글하는데 실패했습니다.',
      };
    }
  }
}
