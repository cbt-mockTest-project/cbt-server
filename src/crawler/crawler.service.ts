import {
  NaverViewTapCrawlerInput,
  NaverViewTapCrawlerOutput,
} from './naverViewTapCrawler.dto';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { load } from 'cheerio';

@Injectable()
export class CrawlerService {
  async naverViewTapCrawler(
    naverViewTapCrawlerInput: NaverViewTapCrawlerInput,
  ): Promise<NaverViewTapCrawlerOutput> {
    try {
      const { keyword, blogName } = naverViewTapCrawlerInput;
      const titleClass = '.sub_txt.sub_name';
      const whereArray = ['view', 'blog'];
      const rank = { all: 0, blog: 0 };
      await Promise.all(
        whereArray.map(async (where) => {
          const naverViewTabUrl = (startNum: number) =>
            `https://search.naver.com/search.naver?&query=${keyword}&start=${startNum}&where=${where}`;
          let startNum = 1;
          let index = 1;
          let finished = false;
          while (startNum < 100) {
            const res = await axios.get(naverViewTabUrl(startNum));
            const $ = load(res.data);
            const titleData = $(titleClass);
            if (!titleData.text()) {
              break;
            }
            titleData.each((i, el) => {
              const title = $(el).text().replace(/ /g, '');
              if (title.indexOf(blogName.replace(/ /g, '')) > -1) {
                finished = true;
                return false;
              }
              index++;
            });
            if (finished) {
              if (where === 'view') {
                rank.all = index;
              }
              if (where === 'blog') {
                rank.blog = index;
              }
              break;
            }
            startNum += 30;
          }
        }),
      );
      return {
        ok: true,
        searchCount: rank,
      };
    } catch {
      return {
        ok: false,
      };
    }
  }
}
