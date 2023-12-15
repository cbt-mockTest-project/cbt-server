import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MockExamBookmark } from './entities/mock-exam-bookmark.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { GetMyBookmarkedExamsOutput } from './dtos/getMyBookmarkedExams.dto';
import {
  ToggleExamBookmarkInput,
  ToggleExamBookmarkOutput,
} from './dtos/toggleExamBookmark.dto';

@Injectable()
export class MockExamBookmarkService {
  constructor(
    @InjectRepository(MockExamBookmark)
    private readonly mockExamBookmark: Repository<MockExamBookmark>,
  ) {}

  async getMyBookmarkedExams(user: User): Promise<GetMyBookmarkedExamsOutput> {
    try {
      const bookmarks = await this.mockExamBookmark.find({
        where: {
          user: {
            id: user.id,
          },
        },
        relations: {
          exam: {
            user: true,
          },
        },
      });
      return {
        ok: true,
        exams: bookmarks.map((bookmark) => bookmark.exam),
      };
    } catch (error) {
      return {
        ok: false,
        error: '북마크된 모의고사를 가져오는데 실패했습니다.',
      };
    }
  }

  async toggleExamBookmark(
    user: User,
    toggleExamBookmarkInput: ToggleExamBookmarkInput,
  ): Promise<ToggleExamBookmarkOutput> {
    try {
      const { examId } = toggleExamBookmarkInput;
      const bookmark = await this.mockExamBookmark.findOne({
        where: {
          exam: {
            id: examId,
          },
          user: {
            id: user.id,
          },
        },
      });
      if (bookmark) {
        await this.mockExamBookmark.delete({
          exam: {
            id: examId,
          },
          user: {
            id: user.id,
          },
        });
      } else {
        await this.mockExamBookmark.save(
          this.mockExamBookmark.create({
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
        isBookmarked: !bookmark,
      };
    } catch (error) {
      return {
        ok: false,
        error: '북마크를 토글하는데 실패했습니다.',
      };
    }
  }
}
