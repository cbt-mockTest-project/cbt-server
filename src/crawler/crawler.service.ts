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
      const postBlogNameClass = '.sub_txt.sub_name';
      const postTitleClass = '.api_txt_lines.total_tit._cross_trigger';
      const whereArray = ['view', 'blog'];
      const rank = { all: 0, blog: 0 };
      const postInfo = { title: '', link: '', content: '' };
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
            const postBlogNameArray = $(postBlogNameClass);
            const postTitleArray = $(postTitleClass);
            if (!postBlogNameArray.text()) {
              break;
            }
            postBlogNameArray.each((i, el) => {
              const postBlogName = $(el).text().replace(/ /g, '');
              if (postBlogName.indexOf(blogName.replace(/ /g, '')) > -1) {
                finished = true;
                postInfo.title = $(postTitleArray[i]).text();
                if ($(postTitleArray[i]).attr()) {
                  postInfo.link = $(postTitleArray[i]).attr().href;
                }

                postInfo.content = $(postTitleArray[i]).next().text().trim();
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
        postInfo,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
      };
    }
  }
}
