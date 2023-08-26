import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { load } from 'cheerio';
import { ChatbotKey } from './entities/chatbot-key.entity';
import { IsNull, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ValidateChatbotKeyInput } from './dtos/validateChatbotKey.dto';
import {
  RegisterChatbotInput,
  RegisterChatbotOutput,
} from './dtos/registerChatbot.dto';

@Injectable()
export class ChatbotService {
  constructor(
    @InjectRepository(ChatbotKey)
    private readonly chatbotKeys: Repository<ChatbotKey>,
  ) {}
  async getNews() {
    try {
      const res = await axios.get(
        'https://media.naver.com/press/437/ranking?type=popular',
      );
      const $ = load(res.data);
      const newsList = $('li.as_thumb');
      if (!newsList.text()) {
        return {
          ok: false,
          error: '뉴스를 찾을 수 없습니다.',
        };
      }
      let result = '';
      newsList.each((i, news) => {
        if (i > 9) {
          return;
        }
        const title = $(news).find('.list_title').text();
        const link = $(news).find('a').attr('href');
        result += `${i + 1}. ${title}\n${link}\n\n`;
      });
      return {
        ok: true,
        result,
      };
    } catch {
      return {
        ok: false,
        error: '뉴스를 찾을 수 없습니다.',
      };
    }
  }

  async createChatbotKeys() {
    const keys = [];
    for (let i = 0; i < 5000; i++) {
      keys.push(uuidv4().slice(0, 8));
    }
    const uniqueArr = Array.from(new Set(keys));
    await this.chatbotKeys.save(
      uniqueArr.map((key) => this.chatbotKeys.create({ key })),
    );
    return {
      ok: true,
    };
  }

  async validateChatbotKey(validateChatbotKeyInput: ValidateChatbotKeyInput) {
    try {
      const { key } = validateChatbotKeyInput;
      const chatbotKey = await this.chatbotKeys.findOne({
        where: {
          key,
        },
      });
      if (!chatbotKey || !chatbotKey.startDate || !chatbotKey.endDate) {
        return {
          ok: false,
          error: '등록되지 않은 계정입니다.',
        };
      }
      const todayString = new Date().toISOString().slice(0, 10);
      if (todayString > chatbotKey.endDate) {
        return {
          ok: false,
          error: '기간이 만료되었습니다.\n개발자에게 문의해주세요.',
        };
      }
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error:
          '오류가 발생했습니다\n다시 시도해주세요.\n문제가 지속되면 개발자에게 문의해주세요.',
      };
    }
  }

  async registerChatbot(
    registerChatbotInput: RegisterChatbotInput,
  ): Promise<RegisterChatbotOutput> {
    try {
      const { duration } = registerChatbotInput;
      const keys = await this.chatbotKeys.find({
        where: {
          startDate: IsNull(),
          endDate: IsNull(),
        },
      });
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + duration + 1);
      await this.chatbotKeys.save({
        ...randomKey,
        startDate: startDate.toISOString().slice(0, 10),
        endDate: endDate.toISOString().slice(0, 10),
      });
      return {
        ok: true,
        key: randomKey.key,
      };
    } catch {
      return {
        ok: false,
        error: '알 수 없는 오류가 발생했습니다.',
      };
    }
  }
}
