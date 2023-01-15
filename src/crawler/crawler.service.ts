import {
  NaverViewTapCrawlerInput,
  NaverViewTapCrawlerOutput,
} from './naverViewTapCrawler.dto';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TelegramService } from './../telegram/telegram.service';
import { load } from 'cheerio';
import * as webdriver from 'selenium-webdriver';
import * as firefox from 'selenium-webdriver/firefox';
import { By } from 'selenium-webdriver';
import { waitFor } from 'src/utils/utils';
import puppeteer from 'puppeteer';

@Injectable()
export class CrawlerService {
  constructor(private readonly telegramService: TelegramService) {}
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
  async naverBlogViewMacro() {
    this.telegramService.sendMessageToAlramChannelOfTelegram({
      message: '블로그 매크로 시작',
    });
    const blogUrl = process.env.BLOG_URL;
    const postLinkClass = '.link__iGhdI';
    const postTitleClass = '.title__tl7L1';
    const postAuthorClass = '.blog_author';
    // const firefoxOptions = new firefox.Options();
    // firefoxOptions.addArguments('--headless');
    // firefoxOptions.addArguments('--disable-gpu');
    // firefoxOptions.addArguments('--no-sandbox');
    const browser = await puppeteer.launch({
      headless: false,
      devtools: true,
    });

    // const driver = await new webdriver.Builder()
    //   .withCapabilities(webdriver.Capabilities.firefox())
    //   .setFirefoxOptions(firefoxOptions)
    //   .build();
    // try {

    //   await driver.get(blogUrl);
    //   await driver.wait(
    //     webdriver.until.elementLocated(By.className(postLinkClass)),
    //     10000,
    //   );
    //   const postLinkArray = [];
    //   const postLinkElements = await driver.findElements(
    //     By.className(postLinkClass),
    //   );

    const page = await browser.newPage();
    // await page.goto(`https://naver.com`);
    // await waitFor(5000);

    // await page.evaluate(async () => {
    //   document.cookie =
    //     'NNB=; domain=.naver.com; expires=Thu, 01Jan 1999 00:00:10 GMT;';
    //   alert('hi');
    //   // console.log(await page.cookies());
    // });
    await page.goto(blogUrl);
    await page.waitForSelector(postLinkClass);
    // const postLinkArray = [];
    const content = await page.content();
    const $ = load(content);
    const postLinks = [];
    const postLinksCheerio = $(postLinkClass);
    postLinksCheerio.each(async (index, link) => {
      const href = $(link).attr('href');
      const title = $(link).find(postTitleClass).text();
      if (href && title) {
        postLinks.push({ title, href });
      }
    });
    let i = 0;
    while (true) {
      if (i >= postLinks.length) break;
      await page.goto(
        `https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=${postLinks[i].title}`,
      );
      await waitFor(5000);
      await page.goto(postLinks[i].href);
      await page.waitForSelector(postAuthorClass);
      await waitFor(500);
      await page.evaluate(
        () =>
          `document.cookie = 'NNB=; domain=.naver.com; expires=Thu, 01Jan 1999 00:00:10 GMT;'`,
      );
      await waitFor(10000);
      i++;
    }
    browser.close();

    // await Promise.all(
    //   postLinkElements.map(async (el) => {
    //     const href = await el.getAttribute('href');
    //     const title = await el
    //       .findElement(By.className(postTitleClass))
    //       .getText();
    //     if (href && title) postLinkArray.push({ href, title });
    //   }),
    // );
    // let i = 0;
    // while (true) {
    //   if (i >= postLinkArray.length) break;
    //   await driver.get(
    //     `https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=${postLinkArray[i].title}`,
    //   );
    //   await driver.manage().setTimeouts({
    //     implicit: 10000, // 10초
    //     pageLoad: 60000, // 60초
    //     script: 60000, // 60초
    //   });
    //   await waitFor(5000);
    //   await driver.get(postLinkArray[i].href);
    //   await driver.wait(
    //     webdriver.until.elementLocated(By.className(postAuthorClass)),
    //     60000,
    //   );
    //   await driver.executeScript(
    //     `document.cookie = 'NNB=; domain=.naver.com; expires=Thu, 01Jan 1999 00:00:10 GMT;'`,
    //   );
    //   await waitFor(10000);
    //   i++;
    // }
    // this.telegramService.sendMessageToAlramChannelOfTelegram({
    //   message: '블로그 매크로 완료',
    // });
    // await driver.quit();
    return {
      ok: true,
    };
  }
  catch(e) {
    // await driver.quit();
    console.log(e);
    this.telegramService.sendMessageToAlramChannelOfTelegram({
      message: '블로그 매크로 실패',
    });
    return {
      ok: false,
    };
  }
}
