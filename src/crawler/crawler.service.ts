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
      const postBoxClass = '.total_wrap.api_ani_send';
      const postBlogNameClass = '.sub_txt.sub_name';
      const postTitleClass = '.api_txt_lines.total_tit';
      const postContentClass = '.api_txt_lines.dsc_txt';
      const postFlickerThumbClass = '.thumb._cross_trigger';
      const postThumbClass = '.thumb.api_get';
      const whereArray = ['view', 'blog'];
      const rank = { all: 0, blog: 0 };
      const postInfo = { title: '', link: '', content: '', thumb: '' };
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
            const postBoxArray = $(postBoxClass);
            if (!postBoxArray.text()) {
              break;
            }
            postBoxArray.each((i, post) => {
              const postBlogName = $(post)
                .find(postBlogNameClass)
                .text()
                .replace(/ /g, '');
              if (postBlogName.indexOf(blogName.replace(/ /g, '')) > -1) {
                finished = true;
                const postTitle = $(post).find(postTitleClass);
                const postThumb = $(post).find(postThumbClass);
                const postFlickerThumb = $(post).find(postFlickerThumbClass);
                const postContent = $(post).find(postContentClass);
                if (postFlickerThumb && postFlickerThumb.length >= 1) {
                  postInfo.thumb = $(postFlickerThumb)
                    .children('img')
                    .attr('src');
                }
                postInfo.title = postTitle.text() || '';
                postInfo.link = $(postTitle).attr('href') || '';
                if (!postInfo.thumb) {
                  postInfo.thumb = $(postThumb).attr('src') || '';
                }
                postInfo.content = $(postContent).text().trim() || '';
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
    } catch {
      return {
        ok: false,
      };
    }
  }
}
