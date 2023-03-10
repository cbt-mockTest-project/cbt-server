import {
  NaverViewTapCrawlerInput,
  NaverViewTapCrawlerOutput,
  SearchCounts,
} from './dtos/naverViewTapCrawler.dto';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TelegramService } from './../telegram/telegram.service';
import { load } from 'cheerio';
import * as webdriver from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import { By } from 'selenium-webdriver';
import {
  NaverBlogViewMacroInput,
  NaverBlogViewMacroOutput,
} from './dtos/naverBlogViewMacro.dto';

@Injectable()
export class CrawlerService {
  constructor(private readonly telegramService: TelegramService) {}
  async naverViewTapCrawler(
    naverViewTapCrawlerInput: NaverViewTapCrawlerInput,
  ): Promise<NaverViewTapCrawlerOutput> {
    try {
      const { keyword, blogName } = naverViewTapCrawlerInput;
      const naverPostBoxClass = '.total_wrap.api_ani_send';
      const naverPostBlogNameClass = '.sub_txt.sub_name';
      const naverPostTitleClass = '.api_txt_lines.total_tit';
      const naberPostContentClass = '.api_txt_lines.dsc_txt';
      const naverPostFlickerThumbClass = '.thumb._cross_trigger';
      const naverPostThumbClass = '.thumb.api_get';
      const daumPostBoxClass = '.info_item';
      const daumPostBlogNameClass = '.fc_mid';
      const naverwhereArray = ['view', 'blog'];
      const daumwhereArray = ['view', 'blog'];
      const rank: SearchCounts = {
        naver: { all: 0, blog: 0 },
        daum: { all: 0, blog: 0 },
      };
      const postInfo = { title: '', link: '', content: '', thumb: '' };
      const exploreNaver = naverwhereArray.map(async (where) => {
        const naverViewTabUrl = (startNum: number) =>
          `https://search.naver.com/search.naver?&query=${keyword}&start=${startNum}&where=${where}`;
        let startNum = 1;
        let index = 1;
        let finished = false;
        while (startNum < 100) {
          const res = await axios.get(naverViewTabUrl(startNum));
          const $ = load(res.data);
          const postBoxArray = $(naverPostBoxClass);
          if (!postBoxArray.text()) {
            break;
          }
          postBoxArray.each((i, post) => {
            const postBlogName = $(post)
              .find(naverPostBlogNameClass)
              .text()
              .replace(/ /g, '');
            if (postBlogName.indexOf(blogName.replace(/ /g, '')) > -1) {
              finished = true;
              const postTitle = $(post).find(naverPostTitleClass);
              const postThumb = $(post).find(naverPostThumbClass);
              const postFlickerThumb = $(post).find(naverPostFlickerThumbClass);
              const postContent = $(post).find(naberPostContentClass);
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
              rank.naver.all = index;
            }
            if (where === 'blog') {
              rank.naver.blog = index;
            }
            break;
          }
          startNum += 30;
        }
      });
      const exploreDaum = daumwhereArray.map(async (where) => {
        const daumUrl = (page: number) =>
          `https://m.search.daum.net/search?p=${page}&q=${encodeURIComponent(
            keyword,
          )}&col=${where}&w=fusion&DA=TWC`;
        let page = 0;
        let index = 1;
        let finished = false;
        while (page < 1) {
          page++;
          const res = await axios.get(daumUrl(page), {
            headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
          });
          const $ = load(res.data);
          const postBoxArray = $(daumPostBoxClass);
          if (!postBoxArray.text()) {
            break;
          }
          postBoxArray.each((i, post) => {
            const postBlogName = $(post)
              .find(daumPostBlogNameClass)
              .text()
              .replace(/ /g, '');
            if (postBlogName.indexOf(blogName.replace(/ /g, '')) > -1) {
              finished = true;
              return false;
            }
            index++;
          });
          if (finished) {
            if (where === 'view') {
              rank.daum.all = index;
            }
            if (where === 'blog') {
              rank.daum.blog = index;
            }
            break;
          }
        }
      });
      await Promise.all([...exploreNaver, ...exploreDaum]);
      console.log(rank);
      return {
        ok: true,
        searchCounts: rank,
        postInfo,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
      };
    }
  }
  async naverBlogViewMacro(
    naverBlogViewMacroInput: NaverBlogViewMacroInput,
  ): Promise<NaverBlogViewMacroOutput> {
    const { blogUrl } = naverBlogViewMacroInput;
    this.telegramService.sendMessageToAlramChannelOfTelegram({
      message: '블로그 매크로 시작',
    });
    const waitFor = (delay: number) =>
      new Promise((resolve) => setTimeout(resolve, delay));
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments('--headless');
    chromeOptions.addArguments('--disable-gpu');
    chromeOptions.addArguments('--no-sandbox');
    const driver = await new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.chrome())
      .setChromeOptions(chromeOptions)
      .build();
    try {
      const url = blogUrl || process.env.BLOG_URL;
      const postLinkClass = 'link__iGhdI';
      const naverPostTitleClass = 'title__tl7L1';
      const postAuthorClass = 'blog_author';
      await driver.get(url);
      await driver.wait(
        webdriver.until.elementLocated(By.className(postLinkClass)),
        10000,
      );
      const postLinkArray = [];
      const postLinkElements = await driver.findElements(
        By.className(postLinkClass),
      );
      await Promise.all(
        postLinkElements.map(async (el) => {
          const href = await el.getAttribute('href');
          const title = await el
            .findElement(By.className(naverPostTitleClass))
            .getText();
          if (href && title) postLinkArray.push({ href, title });
        }),
      );
      let i = 0;
      while (true) {
        if (i >= postLinkArray.length) break;
        await driver.get(
          `https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=${postLinkArray[i].title}`,
        );
        await driver.manage().setTimeouts({
          implicit: 10000, // 10초
          pageLoad: 60000, // 60초
          script: 60000, // 60초
        });
        await waitFor(5000);
        await driver.get(postLinkArray[i].href);
        await driver.wait(
          webdriver.until.elementLocated(By.className(postAuthorClass)),
          60000,
        );

        await waitFor(10000);
        await driver.executeScript(
          `document.cookie = 'NNB=; domain=.naver.com; expires=Thu, 01Jan 1999 00:00:10 GMT;'`,
        );
        await waitFor(10000);
        i++;
      }
      this.telegramService.sendMessageToAlramChannelOfTelegram({
        message: '블로그 매크로 완료',
      });
      await driver.quit();
      return {
        ok: true,
      };
    } catch (e) {
      await driver.quit();
      console.log(e);
      this.telegramService.sendMessageToAlramChannelOfTelegram({
        message: '블로그 매크로 실패',
      });
      return {
        ok: false,
      };
    }
  }
}
