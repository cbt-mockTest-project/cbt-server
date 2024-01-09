import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { GetMyBookmarkedExamCategoriesOutput } from './dtos/getMyBookmarkedExamCategories.dto';
import {
  ToggleExamCategoryBookmarkInput,
  ToggleExamCategoryBookmarkOutput,
} from './dtos/toggleExamCategoryBookmark.dto';
import { ExamCategoryBookmark } from './entities/exam-category-bookmark';
import {
  DeleteExamCategoryBookmarkInput,
  DeleteExamCategoryBookmarkOutput,
} from './dtos/deleteExamCategoryBookmark';
import { MockExamCategory } from 'src/exam-category/entities/mock-exam-category.entity';
import {
  GetExamCategorySubscribersInput,
  GetExamCategorySubscribersOutput,
} from './dtos/getExamCategorySubscribers.dto';

@Injectable()
export class ExamCategoryBookmarkService {
  constructor(
    @InjectRepository(ExamCategoryBookmark)
    private readonly examCategoryBookmark: Repository<ExamCategoryBookmark>,
    @InjectRepository(MockExamCategory)
    private readonly mockExamCategory: Repository<MockExamCategory>,
  ) {}

  async getMyBookmarkedExamCategories(
    user: User,
  ): Promise<GetMyBookmarkedExamCategoriesOutput> {
    try {
      const bookmarks = await this.examCategoryBookmark.find({
        where: {
          user: {
            id: user.id,
          },
        },
        relations: {
          category: {
            user: true,
            mockExam: true,
          },
        },
        order: {
          category: {
            order: 'ASC',
            created_at: 'DESC',
          },
        },
      });
      return {
        ok: true,
        categories: bookmarks.map((bookmark) => ({
          ...bookmark.category,
          isBookmarked: true,
        })),
      };
    } catch (error) {
      return {
        ok: false,
        error: '북마크된 폴더를 가져오는데 실패했습니다.',
      };
    }
  }

  async toggleExamCategoryBookmark(
    user: User,
    toggleExamBookmarkInput: ToggleExamCategoryBookmarkInput,
  ): Promise<ToggleExamCategoryBookmarkOutput> {
    try {
      const { categoryId } = toggleExamBookmarkInput;
      const bookmark = await this.examCategoryBookmark.findOne({
        where: {
          category: {
            id: categoryId,
          },
          user: {
            id: user.id,
          },
        },
      });
      if (bookmark) {
        await this.examCategoryBookmark.delete({
          category: {
            id: categoryId,
          },
          user: {
            id: user.id,
          },
        });
      } else {
        await this.examCategoryBookmark.save(
          this.examCategoryBookmark.create({
            category: {
              id: categoryId,
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

  async deleteExamCategoryBookmark(
    user: User,
    deleteExamCategoryBookmarkInput: DeleteExamCategoryBookmarkInput,
  ): Promise<DeleteExamCategoryBookmarkOutput> {
    try {
      const { userId, categoryId } = deleteExamCategoryBookmarkInput;
      const category = await this.mockExamCategory.findOne({
        where: {
          id: categoryId,
          user: {
            id: user.id,
          },
        },
      });
      if (!category) {
        return {
          ok: false,
          error: '잘못된 접근입니다.',
        };
      }
      await this.examCategoryBookmark.delete({
        user: {
          id: userId,
        },
        category: {
          id: categoryId,
        },
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: '북마크를 삭제하는데 실패했습니다.',
      };
    }
  }

  async getExamCategorySubscribers(
    user: User,
    getExamCategorySubscribers: GetExamCategorySubscribersInput,
  ): Promise<GetExamCategorySubscribersOutput> {
    const { categoryId } = getExamCategorySubscribers;
    try {
      const category = await this.mockExamCategory.findOne({
        where: {
          id: categoryId,
          user: {
            id: user.id,
          },
        },
      });
      if (!category) {
        return {
          ok: false,
          error: '잘못된 접근입니다.',
        };
      }
      const subscribers = await this.examCategoryBookmark.find({
        where: {
          category: {
            id: categoryId,
          },
        },
        relations: {
          user: true,
        },
        order: {
          user: {
            nickname: 'ASC',
          },
        },
      });
      return {
        ok: true,
        users: subscribers.map((subscriber) => subscriber.user),
      };
    } catch (error) {
      return {
        ok: false,
        error: '구독자를 가져오는데 실패했습니다.',
      };
    }
  }
}
