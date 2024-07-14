import { User } from 'src/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MockExamQuestionBookmarkFolder } from './entities/mock-exam-question-bookmark-folder.entity';
import {
  CreateQuestionBookmarkFolderInput,
  CreateQuestionBookmarkFolderOutput,
} from './dtos/question-bookmark-folder/create-question-bookmark-folder.dto';
import {
  DeleteQuestionBookmarkFolderInput,
  DeleteQuestionBookmarkFolderOutput,
} from './dtos/question-bookmark-folder/delete-question-bookmark-folder.dto';
import { ReadQuestionBookmarkFoldersOutput } from './dtos/question-bookmark-folder/read-question-bookmark-folders.dto';
import {
  UpdateQuestionBookmarkFolderInput,
  UpdateQuestionBookmarkFolderOutput,
} from './dtos/question-bookmark-folder/update-question-bookmark-folder.dto';

@Injectable()
export class MockExamQuestionBookmarkFolderSerivce {
  constructor(
    @InjectRepository(MockExamQuestionBookmarkFolder)
    private readonly mockExamQuestionBookmarkFolder: Repository<MockExamQuestionBookmarkFolder>,
  ) {}

  async createQuestionBookmarkFolder(
    createQuestionBookmarkFolderInput: CreateQuestionBookmarkFolderInput,
    user: User,
  ): Promise<CreateQuestionBookmarkFolderOutput> {
    try {
      const { name } = createQuestionBookmarkFolderInput;
      const existingFolder = await this.mockExamQuestionBookmarkFolder.findOne({
        where: { name, user },
      });
      if (existingFolder) {
        return {
          ok: false,
          error: '이미 존재하는 폴더입니다.',
        };
      }
      const newFolder = this.mockExamQuestionBookmarkFolder.create({
        name,
        user,
      });
      await this.mockExamQuestionBookmarkFolder.save(newFolder);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: '폴더 생성에 실패했습니다.',
      };
    }
  }

  async deleteQuestionBookmarkFolder(
    deleteQuestionBookmarkFolderInput: DeleteQuestionBookmarkFolderInput,
    user: User,
  ): Promise<DeleteQuestionBookmarkFolderOutput> {
    try {
      const { id } = deleteQuestionBookmarkFolderInput;
      await this.mockExamQuestionBookmarkFolder.delete({
        id,
        user: { id: user.id },
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: '폴더 삭제에 실패했습니다.',
      };
    }
  }

  async readQuestionBookmarkFolders(
    user: User,
  ): Promise<ReadQuestionBookmarkFoldersOutput> {
    try {
      const folders = await this.mockExamQuestionBookmarkFolder.find({
        where: {
          user: {
            id: user.id,
          },
        },
      });
      return {
        ok: true,
        folders,
      };
    } catch (error) {
      return {
        ok: false,
        error: '폴더 조회에 실패했습니다.',
      };
    }
  }

  async updateQuestionBookmarkFolder(
    updateQuestionBookmarkFolderInput: UpdateQuestionBookmarkFolderInput,
    user: User,
  ): Promise<UpdateQuestionBookmarkFolderOutput> {
    try {
      const { id, name } = updateQuestionBookmarkFolderInput;
      const existingFolder = await this.mockExamQuestionBookmarkFolder.findOne({
        where: {
          id,
          user: {
            id: user.id,
          },
        },
      });
      if (!existingFolder) {
        return {
          ok: false,
          error: '폴더가 존재하지 않습니다.',
        };
      }
      existingFolder.name = name;
      await this.mockExamQuestionBookmarkFolder.save(existingFolder);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: '폴더 수정에 실패했습니다.',
      };
    }
  }
}
