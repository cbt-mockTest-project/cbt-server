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

@Injectable()
export class ExamCategoryBookmarkService {
  constructor(
    @InjectRepository(ExamCategoryBookmark)
    private readonly examCategoryBookmark: Repository<ExamCategoryBookmark>,
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
          },
        },
      });
      return {
        ok: true,
        categories: bookmarks.map((bookmark) => bookmark.category),
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
}
