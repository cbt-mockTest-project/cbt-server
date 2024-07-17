import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TextHighlight } from './entites/text-highlight.entity';
import {
  InsertTextHighlightInput,
  InsertTextHighlightOutput,
} from './dtos/insert-text-highlight.dto';
import { User } from 'src/users/entities/user.entity';
import {
  DeleteTextHighlightInput,
  DeleteTextHighlightOutput,
} from './dtos/delete-text-highlight.dto';
import {
  DeleteTextHighlightsInput,
  DeleteTextHighlightsOutput,
} from './dtos/delete-text-highlights.dto';

@Injectable()
export class TextHighlightService {
  constructor(
    @InjectRepository(TextHighlight)
    private readonly textHighlights: Repository<TextHighlight>,
  ) {}

  async insertTextHighlight(
    insertTextHighlightInput: InsertTextHighlightInput,
    user: User,
  ): Promise<InsertTextHighlightOutput> {
    try {
      const { questionId, data, textHighlightId } = insertTextHighlightInput;
      const previousTextHighlight = await this.textHighlights.findOne({
        where: {
          id: textHighlightId,
          user: { id: user.id },
        },
      });
      if (previousTextHighlight) {
        await this.textHighlights.update({ id: textHighlightId }, { data });
        return {
          ok: true,
          textHighlight: { ...previousTextHighlight, data },
        };
      }
      const textHighlight = this.textHighlights.create({
        id: textHighlightId,
        data,
        question: {
          id: questionId,
        },
        user: {
          id: user.id,
        },
      });
      const result = await this.textHighlights.save(textHighlight);
      return {
        ok: true,
        textHighlight: result,
      };
    } catch (error) {
      return {
        ok: false,
        error: '저장에 실패했습니다.',
      };
    }
  }

  async deleteTextHighlight(
    deleteTextHighlightInput: DeleteTextHighlightInput,
    user: User,
  ): Promise<DeleteTextHighlightOutput> {
    try {
      const { textHighlightId } = deleteTextHighlightInput;
      await this.textHighlights.delete({
        id: textHighlightId,
        user: { id: user.id },
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: '삭제에 실패했습니다.',
      };
    }
  }

  async deleteTextHighlights(
    deleteTextHighlightsInput: DeleteTextHighlightsInput,
    user: User,
  ): Promise<DeleteTextHighlightsOutput> {
    try {
      const { questionId } = deleteTextHighlightsInput;
      await this.textHighlights.delete({
        question: { id: questionId },
        user: { id: user.id },
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: '삭제에 실패했습니다.',
      };
    }
  }
}
