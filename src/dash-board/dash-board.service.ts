// eslint-disable-next-line @typescript-eslint/no-var-requires
const UserAgent = require('user-agents');
import { Injectable } from '@nestjs/common';
import { load } from 'cheerio';
import axios from 'axios';
import { GetSearchRankInput } from './dtos/get-search-rank.dto';
import { GetSearchAvailabilityInput } from './dtos/get-search-availability';
import { GetBlogPostsResponse } from 'src/types/dash-board';
import { NaverBlogViewMacroInput } from './dtos/naver-blog-view-macro.dto';
import * as webdriver from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import { By } from 'selenium-webdriver';
import { shuffle } from 'lodash';
import { delay } from 'src/lib/utils/util';

@Injectable()
export class DashBoardService {
  async getSearchdRank(getSearchRankInput: GetSearchRankInput) {
    try {
      const { keyword, blogId } = getSearchRankInput;

      let naverPostOffSet = 1;
      let daumPostPage = 1;

      let naverBlogSearchRank = 0;
      let daumBlogSearchRank = 0;
      let postLink = '';

      const naverBlogSearchLink = (start: number) =>
        `https://search.naver.com/search.naver?ssc=tab.blog.all&query=${encodeURIComponent(
          keyword,
        )}&start=${start}`;
      const daumBlogSearchLink = (page: number) =>
        `https://m.search.daum.net/search?p=${page}&q=${encodeURIComponent(
          keyword,
        )}&col=blog&w=fusion&DA=TWC`;

      while (naverPostOffSet < 100) {
        const { data } = await axios.get(naverBlogSearchLink(naverPostOffSet));
        const $ = load(data);
        const postBoxList = $(naverBlogSearchClassMap.postBox.class);
        if (!postBoxList.text()) break;
        postBoxList.each((i, el) => {
          if (naverPostOffSet !== 100) {
            naverBlogSearchRank++;
          }

          const userBox = $(el).find(
            naverBlogSearchClassMap.postBox.children.userBox.class,
          );
          const userName = userBox.find(
            naverBlogSearchClassMap.postBox.children.userBox.children.userName,
          );
          const blogLink = userName.attr('href');
          if (blogLink.split('/')[3] === blogId) {
            naverPostOffSet = 100; //반복 종료 트리거
            const detailBox = $(el).find(
              naverBlogSearchClassMap.postBox.children.detailBox.class,
            );
            const title = detailBox.find(
              naverBlogSearchClassMap.postBox.children.detailBox.children.title,
            );

            postLink = title.attr('href');
          }
        });
        naverPostOffSet += 30;
      }

      while (daumPostPage < 10) {
        const { data } = await axios.get(daumBlogSearchLink(daumPostPage));
        const $ = load(data);
        const postBoxList = $(daumBlogSearchClassMap.postBox.tag);
        if (!postBoxList.text()) break;
        postBoxList.each((i, el) => {
          if (daumPostPage !== 10) {
            daumBlogSearchRank++;
          }

          const foundPostLink = $(el)
            .find(daumBlogSearchClassMap.postBox.children.header.tag)
            .html()
            .match(/data-link="([^"]+)"/)[1]
            .replace('m.', '');

          if (foundPostLink.split('/')[3] === blogId) {
            daumPostPage = 10; // 반복 종료 트리거
            postLink = foundPostLink;
          }
        });
        daumPostPage++;
      }
      return {
        naverBlogSearchRank,
        daumBlogSearchRank,
        postLink,
      };
    } catch (e) {
      console.log(e);
    }
  }

  async getSearchAvailability(
    getSearchAvailabilityInput: GetSearchAvailabilityInput,
  ) {
    try {
      const { blogId, itemCount, page } = getSearchAvailabilityInput;
      const getPostsEndPoint = `https://m.blog.naver.com/api/blogs/${blogId}/post-list?categoryNo=0&itemCount=${itemCount}&page=${page}`;

      const { data } = await axios.get<GetBlogPostsResponse>(getPostsEndPoint, {
        headers: {
          referer: `https://m.blog.naver.com/${blogId}?tab=1`,
        },
      });
      if (!data.isSuccess) {
        return {
          ok: false,
          error: '블로그 포스트를 가져올 수 없습니다.',
        };
      }

      const searchAvailabilityInfos = await Promise.all(
        data.result.items.map(async (post) => {
          let isSearchAvailability = false;
          const { data } = await axios.get<string>(
            naverBlogSearchLink(`"${post.titleWithInspectMessage}"`),
          );
          if (data.includes(blogId)) {
            isSearchAvailability = true;
          }
          return {
            title: post.titleWithInspectMessage,
            logNo: post.logNo,
            isSearchAvailability,
          };
        }),
      );
      const results = data.result.items.map((post) =>
        searchAvailabilityInfos.find((info) => info.logNo === post.logNo),
      );

      return {
        results,
        ok: true,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: '서버 에러',
      };
    }
  }

  async naverBlogViewMacro(naverBlogViewMacroInput: NaverBlogViewMacroInput) {
    const { blogId, viewCount } = naverBlogViewMacroInput;
    const chromeOptions = new chrome.Options();
    // chromeOptions.addArguments('--headless');
    chromeOptions.addArguments('--disable-gpu');
    chromeOptions.addArguments('--no-sandbox');
    const driver = await new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.chrome())
      .setChromeOptions(chromeOptions)
      .build();
    await driver.manage().setTimeouts({
      implicit: 3000, // 3초
      pageLoad: 60000, // 60초
      script: 60000, // 60초
    });
    try {
      const pages = [1, 2, 3, 4, 5];
      const postArrayList = await Promise.all(
        pages.map(async (page) => {
          const getPostsEndPoint = `https://m.blog.naver.com/api/blogs/${blogId}/post-list?categoryNo=0&itemCount=${30}&page=${page}`;
          const { data } = await axios.get<GetBlogPostsResponse>(
            getPostsEndPoint,
            {
              headers: {
                referer: `https://m.blog.naver.com/${blogId}?tab=1`,
              },
            },
          );
          return data;
        }),
      );
      let posts = postArrayList.flatMap((post) => post.result.items);
      console.log(posts.length);
      posts = shuffle(posts);
      if (!posts.length)
        return {
          ok: false,
          error: '블로그 포스트가 없습니다.',
        };
      let currentViewCount = 0;
      while (currentViewCount <= Number(viewCount)) {
        for await (const post of posts) {
          const naverLinkList = ['https://naver.com', 'https://m.naver.com'];
          const currentNaverLink =
            Math.random() <= 0.7 ? naverLinkList[1] : naverLinkList[0]; // 70% 확률로 모바일 링크
          if (currentNaverLink === 'https://naver.com') {
            await driver.get('https://naver.com');
            const userAgent = new UserAgent({ deviceCategory: 'desktop' });
            const pcAgent = userAgent.toString();
            console.log('pcAgent', pcAgent);
            await driver.executeScript(
              `window.navigator.__defineGetter__('userAgent', function(){return '${pcAgent}';})`,
            );
            await driver.executeScript(
              `document.cookie = 'NNB=; domain=.naver.com; expires=Thu, 01Jan 1999 00:00:10 GMT;'`,
            );
            await driver.findElement(By.className('search_input'));
            await driver.executeScript(
              `document.querySelector('.search_input').value = '"${post.titleWithInspectMessage}"';`,
            );
            await driver.findElement(By.id('search-btn')).click();
            await driver.findElement(By.linkText('블로그')).click();
            const title = await driver.findElements(
              By.linkText(post.titleWithInspectMessage),
            );
            if (title.length) {
              currentViewCount++;
              title[0].click();
              await delay(5000);
              const handles = await driver.getAllWindowHandles();
              await driver.switchTo().window(handles[1]);
              // delay 60초 ~ 120초 사이로 랜덤
              await delay(Math.floor(Math.random() * 60000) + 60000);
              await driver.close();
              await delay(500);
              await driver.switchTo().window(handles[0]);
            }
          }
          if (currentNaverLink === 'https://m.naver.com') {
            await driver.get('https://m.naver.com');
            const userAgent = new UserAgent({
              deviceCategory: 'mobile',
            });
            const mobileAgent = userAgent.toString();
            console.log('mobileAgent', mobileAgent);
            await driver.executeScript(
              `window.navigator.__defineGetter__('userAgent', function(){return '${mobileAgent}';})`,
            );
            await driver.executeScript(
              `document.cookie = 'NNB=; domain=.naver.com; expires=Thu, 01Jan 1999 00:00:10 GMT;'`,
            );
            await driver.findElement(By.id('MM_SEARCH_FAKE')).click();
            await driver.findElement(By.className('sch_input'));
            await driver.executeScript(
              `document.querySelector('.sch_input').value = '"${post.titleWithInspectMessage}"';`,
            );
            await driver.findElement(By.className('MM_SEARCH_SUBMIT')).click();
            await driver.findElement(By.linkText('블로그')).click();
            const title = await driver.findElements(
              By.linkText(post.titleWithInspectMessage),
            );
            if (title.length) {
              currentViewCount++;
              title[0].click();
              // delay 60초 ~ 120초 사이로 랜덤
              await delay(Math.floor(Math.random() * 60000) + 60000);
            }
          }
          if (currentViewCount >= Number(viewCount)) break;
        }
        posts = shuffle(posts);
      }
      await driver.quit();
      return {
        ok: true,
      };
    } catch (e) {
      await driver.quit();
      console.log(e);
      return {
        ok: false,
      };
    }
  }
}

const naverBlogSearchClassMap = {
  postBox: {
    class: '.view_wrap',
    children: {
      userBox: {
        class: '.user_box_inner',
        children: {
          userInfo: '.user_info',
          userName: '.name', // '.user_info'의 자식
        },
      },
      detailBox: {
        class: '.detail_box',
        children: {
          title: '.title_link',
        },
      },
    },
  },
};

const daumBlogSearchClassMap = {
  postBox: {
    tag: 'c-card',
    children: {
      header: {
        tag: 'c-header-item',
      },
      title: {
        class: '.tit-g',
      },
    },
  },
};

const naverBlogSearchLink = (keyword: string) =>
  `https://m.blog.naver.com/SectionPostSearch.naver?orderType=sim&searchValue=${encodeURIComponent(
    keyword,
  )}`;
