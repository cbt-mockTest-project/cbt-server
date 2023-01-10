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
      const { keyword, blogName, category } = naverViewTapCrawlerInput;
      const titleClass = '.sub_txt.sub_name';
      const naverViewTabUrl = (startNum: number) =>
        `https://search.naver.com/search.naver?where=view&sm=tab_jum&query=${keyword}&start=${startNum}&where=${category}`;
      let startNum = 1;
      let index = 1;
      let finished = false;
      while (1) {
        const res = await axios.get(naverViewTabUrl(startNum));
        const $ = load(res.data);
        const titleData = $(titleClass);
        if (!titleData.text()) {
          return {
            ok: true,
            message: '게시글이 존재하지 않습니다.',
          };
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
          return {
            ok: true,
            message: `${index} 번째에 등록되어 있습니다.`,
          };
          break;
        }
        startNum += 30;
      }

      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
      };
    }
  }
}
