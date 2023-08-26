import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { load } from 'cheerio';

@Injectable()
export class ChatbotService {
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
}
