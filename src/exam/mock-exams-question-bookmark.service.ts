import { deduplication } from '../utils/utils';
import {
  EditMockExamQuestionBookmarkInput,
  EditMockExamQuestionBookmarkOutput,
} from './dtos/editMockExamQuestionBookmark.dto';
import { User } from 'src/users/entities/user.entity';
import { MockExamQuestion } from './entities/mock-exam-question.entity';
import { MockExamQuestionBookmark } from './entities/mock-exam-question-bookmark.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import {
  ReadMockExamQuestionBookmarkInput,
  ReadMockExamQuestionBookmarkOutput,
} from './dtos/readMockExamQuestionBookmark.dto';
import { ReadExamTitleAndIdOfBookmarkedQuestionOutput } from './dtos/readExamTitleAndIdOfBookmarkedQuestion.dto';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExamQuestionBookmarkFolder } from './entities/mock-exam-question-bookmark-folder.entity';
import {
  DeleteQuestionBookmarkInput,
  DeleteQuestionBookmarkOutput,
} from './dtos/question-bookmark/deleteQuestionBookmark.dto';
import {
  CreateQuestionBookmarkInput,
  CreateQuestionBookmarkOutput,
} from './dtos/question-bookmark/createQuestionBookmark.dto';
import {
  ResetMyQuestionBookmarksInput,
  ResetMyQuestionBookmarksOutput,
} from './dtos/question-bookmark/resetMyQuestionBookmarks.dto';
import {
  MoveQuestionBookmarkInput,
  moveQuestionBookmarkOutput,
} from './dtos/question-bookmark/moveQuestionBookmark.dto';
import {
  ResetQuestionBookmarkInput,
  ResetQuestionBookmarkOutput,
} from './dtos/resetQuestionBookmark.dto';
@Injectable()
export class MockExamQuestionBookmarkSerivce {
  constructor(
    @InjectRepository(MockExamQuestionBookmark)
    private readonly mockExamQuestionBookmark: Repository<MockExamQuestionBookmark>,
    @InjectRepository(MockExamQuestionBookmarkFolder)
    private readonly mockExamQuestionBookmarkFolder: Repository<MockExamQuestionBookmarkFolder>,
    @InjectRepository(MockExamQuestion)
    private readonly mockExamQuestion: Repository<MockExamQuestion>,
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  /** deprecated: 폴더 api 적용후 */
  async editMockExamQuestionBookmark(
    editMockExamQuestionBookmarkInput: EditMockExamQuestionBookmarkInput,
    user: User,
  ): Promise<EditMockExamQuestionBookmarkOutput> {
    try {
      const { questionId } = editMockExamQuestionBookmarkInput;
      const question = await this.mockExamQuestion.findOne({
        where: {
          id: questionId,
        },
      });
      if (!question) {
        return {
          ok: false,
          error: '존재하지 않는 문제입니다.',
        };
      }
      const prevBookmark = await this.mockExamQuestionBookmark.findOne({
        where: {
          user: {
            id: user.id,
          },
          question: {
            id: questionId,
          },
        },
      });
      if (prevBookmark) {
        await this.mockExamQuestionBookmark.delete({ id: prevBookmark.id });
        return {
          ok: true,
          currentState: false,
        };
      }
      const newBookmark = this.mockExamQuestionBookmark.create({
        user: { id: user.id },
        question: { id: questionId },
      });
      await this.mockExamQuestionBookmark.save(newBookmark);
      return {
        ok: true,
        currentState: true,
      };
    } catch {
      return {
        ok: false,
        error: '북마크에 실패했습니다.',
      };
    }
  }

  /** deprecated: 폴더 api 적용후 */
  async readMockExamQuestionBookmark(
    readMockExamQuestionBookmarkInput: ReadMockExamQuestionBookmarkInput,
    user: User,
  ): Promise<ReadMockExamQuestionBookmarkOutput> {
    try {
      const { examId } = readMockExamQuestionBookmarkInput;
      const bookmarks = await this.mockExamQuestionBookmark.find({
        where: {
          question: { mockExam: { id: examId } },
          user: { id: user.id },
        },
        relations: {
          question: true,
        },
      });
      const questions = bookmarks.map((bookmark) => bookmark.question);
      return {
        ok: true,
        questions,
      };
    } catch {
      return {
        ok: false,
        error: '북마크된 문제를 찾을 수 없습니다.',
      };
    }
  }

  /** deprecated: 폴더 api 적용후 */
  async readExamTitleAndIdOfBookmarkedQuestion(
    user: User,
  ): Promise<ReadExamTitleAndIdOfBookmarkedQuestionOutput> {
    try {
      const bookmarks = await this.mockExamQuestionBookmark.find({
        where: {
          user: {
            id: user.id,
          },
        },
        relations: {
          question: { mockExam: true },
        },
      });
      const titleAndId = deduplication(
        bookmarks
          .filter((bookmark) => bookmark.question.mockExam)
          .map((bookmark) => {
            const { title, id } = bookmark.question.mockExam;
            return { title, id };
          })
          .sort((a, b) => (a.title > b.title ? 1 : -1)),
      );
      return { ok: true, titleAndId };
    } catch (e) {
      console.log(e);
      return { ok: false, error: '시험 리스트를 불러올 수 없습니다.' };
    }
  }

  /** deprecated: 폴더 api 적용후 */
  async resetMyQuestionBookmark(user: User): Promise<CoreOutput> {
    try {
      await this.mockExamQuestionBookmark.delete({ user: { id: user.id } });
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: '북마크를 초기화할 수 없습니다.',
      };
    }
  }

  async createQuestionBookmark(
    createQuestionBookmarkInput: CreateQuestionBookmarkInput,
    user: User,
  ): Promise<CreateQuestionBookmarkOutput> {
    try {
      const { questionId, questionBookmarkFolderId } =
        createQuestionBookmarkInput;
      const prevBookmark = await this.mockExamQuestionBookmark.findOne({
        where: {
          user: { id: user.id },
          question: { id: questionId },
        },
      });
      if (prevBookmark) {
        return { ok: false, error: '이미 저장된 문제입니다.' };
      }
      const bookmark = this.mockExamQuestionBookmark.create({
        user: { id: user.id },
        question: { id: questionId },
        ...(questionBookmarkFolderId && {
          bookmarkFolder: { id: questionBookmarkFolderId },
        }),
      });
      const myBookmark = await this.mockExamQuestionBookmark.save(bookmark);
      return { ok: true, myBookmark };
    } catch {
      return { ok: false, error: '북마크를 생성할 수 없습니다.' };
    }
  }

  async deleteQuestionBookmark(
    deleteQuestionBookmarkInput: DeleteQuestionBookmarkInput,
    user: User,
  ): Promise<DeleteQuestionBookmarkOutput> {
    try {
      const { questionBookmarkId } = deleteQuestionBookmarkInput;
      await this.mockExamQuestionBookmark.delete({
        id: questionBookmarkId,
        user: { id: user.id },
      });
      return { ok: true };
    } catch {
      return { ok: false, error: '북마크를 삭제할 수 없습니다.' };
    }
  }

  async resetMyQuestionBookmarks(
    resetMyQuestionBookmarksInput: ResetMyQuestionBookmarksInput,
    user: User,
  ): Promise<ResetMyQuestionBookmarksOutput> {
    try {
      const { questionBookmarkFolderId } = resetMyQuestionBookmarksInput;
      await this.mockExamQuestionBookmark.delete({
        user: { id: user.id },
        bookmarkFolder: { id: questionBookmarkFolderId || null },
      });
      return { ok: true };
    } catch {
      return { ok: false, error: '북마크를 초기화할 수 없습니다.' };
    }
  }

  async moveQuestionBookmark(
    moveQuestionBookmarkInput: MoveQuestionBookmarkInput,
    user: User,
  ): Promise<moveQuestionBookmarkOutput> {
    try {
      const { bookmarkId, bookmarkFolderId } = moveQuestionBookmarkInput;
      const bookmark = await this.mockExamQuestionBookmark.findOne({
        where: {
          id: bookmarkId,
          user: { id: user.id },
        },
      });
      if (!bookmark) {
        return { ok: false, error: '존재하지 않는 북마크입니다.' };
      }
      await this.mockExamQuestionBookmark.update(
        { id: bookmarkId },
        { bookmarkFolder: { id: bookmarkFolderId || null } },
      );
      return { ok: true };
    } catch {
      return { ok: false, error: '북마크를 이동할 수 없습니다.' };
    }
  }

  async resetQuestionBookmark(
    resetQuestionBookmarkInput: ResetQuestionBookmarkInput,
    user: User,
  ): Promise<ResetQuestionBookmarkOutput> {
    try {
      const { questionBookmarkFolderId } = resetQuestionBookmarkInput;
      await this.mockExamQuestionBookmark.delete({
        bookmarkFolder: questionBookmarkFolderId
          ? { id: questionBookmarkFolderId }
          : IsNull(),
        user: { id: user.id },
      });
      return { ok: true };
    } catch {
      return { ok: false, error: '북마크를 초기화할 수 없습니다.' };
    }
  }
}
