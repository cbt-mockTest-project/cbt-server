import {
  GetMyBlogPostRankInput,
  GetMyBlogPostRankOutput,
  SearchCounts,
} from './dtos/get-my-blog-post-rank.dto';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TelegramService } from '../telegram/telegram.service';
import { load } from 'cheerio';
import * as webdriver from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import { By } from 'selenium-webdriver';
import {
  NaverBlogViewMacroInput,
  NaverBlogViewMacroOutput,
} from './dtos/naver-blog-view-macro.dto';
import {
  GetKeywordSearchCountInput,
  GetKeywordSearchCountOutput,
  NaverKeywordSearchCount,
} from './dtos/get-keyword-search-count.dto';
import { Repository } from 'typeorm';
import { NaverBlog } from './entities/naver-blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  GetSearchAvailabilityInput,
  GetSearchAvailabilityOutput,
  NaverPostInfo,
} from './dtos/get-search-availability.dto';
import {
  BlogCategory,
  GetBlogCategoryListInput,
  GetBlogCategoryListOutput,
} from './dtos/get-blog-category-list.dto';
import {
  GetSearchRankInput,
  GetSearchRankOutput,
} from './dtos/get-search-rank.dto';

@Injectable()
export class BlogManageService {
  constructor(
    @InjectRepository(NaverBlog)
    private readonly blogStorage: Repository<NaverBlog>,
    private readonly telegramService: TelegramService,
  ) {}
  async getMyBlogPostRank(
    getMyBlogPostRankInput: GetMyBlogPostRankInput,
  ): Promise<GetMyBlogPostRankOutput> {
    try {
      const { keyword, blogName } = getMyBlogPostRankInput;
      const naverPostBoxClass = '.total_wrap.api_ani_send';
      const naverPostBlogNameClass = '.sub_txt.sub_name';
      const naverPostTitleClass = '.api_txt_lines.total_tit';
      const naberPostContentClass = '.api_txt_lines.dsc_txt';
      const naverPostFlickerThumbClass = '.thumb._cross_trigger';
      const naverPostThumbClass = '.thumb.api_get';
      const naverwhereArray = ['view', 'blog'];
      const daumwhereArray = ['view', 'blog'];
      const rank: SearchCounts = {
        naver: { all: 0, blog: 0, url: '' },
        daum: { all: 0, blog: 0, url: '' },
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
            rank.naver.url = naverViewTabUrl(startNum);
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
        while (page < 10) {
          page++;
          const res = await axios.get(daumUrl(page), {
            headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
          });
          const $ = load(res.data);
          $('c-card').each(function (i, elem) {
            const postBlogName = $(
              $(this).html().replace('<c-frag>', '').replace('</c-frag>', ''),
            )
              .find('c-frag')
              .html()
              .replace(/ /g, '');
            if (postBlogName.indexOf(blogName.replace(/ /g, '')) > -1) {
              finished = true;
              return false;
            }
            index++;
          });
          if (finished) {
            rank.daum.url = daumUrl(page);
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
    this.telegramService.sendMessageToTelegram({
      message: '블로그 매크로 시작',
      channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
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
      this.telegramService.sendMessageToTelegram({
        message: '블로그 매크로 완료',
        channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
      });
      await driver.quit();
      return {
        ok: true,
      };
    } catch (e) {
      await driver.quit();
      console.log(e);
      this.telegramService.sendMessageToTelegram({
        message: '블로그 매크로 실패',
        channelId: Number(process.env.TELEGRAM_ALRAM_CHANNEL),
      });
      return {
        ok: false,
      };
    }
  }

  async getRefreshtoken(refreshToken: string) {
    try {
      const { data } = await axios.put<{ token: string; refreshToken: string }>(
        `https://atower.searchad.naver.com/auth/local/extend?refreshToken=${refreshToken}`,
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async getKeywordSearchCount(
    getKeywordSearchCountInput: GetKeywordSearchCountInput,
  ): Promise<GetKeywordSearchCountOutput> {
    try {
      const refreshToken = await this.blogStorage.findOne({
        where: {
          key: 'refreshToken',
        },
      });
      const token = await this.getRefreshtoken(refreshToken.value);
      const { keyword } = getKeywordSearchCountInput;
      const endPoint = `https://manage.searchad.naver.com/keywordstool?format=json&hintKeywords=${encodeURIComponent(
        keyword.replace(/ /g, '').trim(),
      )}`;
      const { data } = await axios.get<{
        keywordList: NaverKeywordSearchCount[];
      }>(endPoint, {
        headers: {
          authorization: 'Bearer ' + token.token,
        },
      });
      return {
        ok: true,
        keywordList: data.keywordList.map((el) => ({
          ...el,
          monthlyMobileQcCnt: Number(el.monthlyMobileQcCnt) || 0,
          monthlyPcQcCnt: Number(el.monthlyPcQcCnt) || 0,
        })),
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
      };
    }
  }

  async getSearchAvailability(
    getSearchAvailabilityInput: GetSearchAvailabilityInput,
  ): Promise<GetSearchAvailabilityOutput> {
    try {
      const { blogId, itemCount, page } = getSearchAvailabilityInput;
      const getPostsEndPoint = `https://m.blog.naver.com/api/blogs/${blogId}/post-list?categoryNo=0&itemCount=${itemCount}&page=${page}`;

      const { data } = await axios.get<{
        result: { items: NaverPostInfo[] };
        isSuccess: boolean;
      }>(getPostsEndPoint, {
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
            link: `https://m.blog.naver.com/${blogId}/${post.logNo}`,
            commentCnt: post.commentCnt,
            sympathyCnt: post.sympathyCnt,
            titleWithInspectMessage: post.titleWithInspectMessage,
            logNo: post.logNo,
            isSearchAvailability,
          };
        }),
      );
      const posts = data.result.items.map((post) =>
        searchAvailabilityInfos.find((info) => info.logNo === post.logNo),
      );

      return {
        posts,
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

  async getBlogCategoryList(
    getBlogCategoryListInput: GetBlogCategoryListInput,
  ): Promise<GetBlogCategoryListOutput> {
    try {
      const { blogId } = getBlogCategoryListInput;
      const endPoint = `https://m.blog.naver.com/api/blogs/${blogId}/category-list`;
      const { data } = await axios.get<{
        isSuccess: boolean;
        result: { mylogCategoryList: BlogCategory[]; mylogPostCount: number };
      }>(endPoint, {
        headers: {
          referer: `https://m.blog.naver.com/${blogId}?tab=1`,
        },
      });

      console.log(data);
      if (!data.isSuccess) {
        return {
          ok: false,
          error: '카테고리를 가져올 수 없습니다.',
        };
      }
      return {
        ok: true,
        categories: data.result.mylogCategoryList,
        postCnt: data.result.mylogPostCount,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: '서버 에러',
      };
    }
  }

  async getSearchRank(
    getSearchRankInput: GetSearchRankInput,
  ): Promise<GetSearchRankOutput> {
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
          if (naverBlogSearchRank > 100) {
            naverBlogSearchRank = 0;
            naverPostOffSet = 100;
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
          if (daumBlogSearchRank > 100) {
            daumBlogSearchRank = 0;
            daumPostPage = 10;
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
        ok: true,
        naverBlogSearchRank,
        daumBlogSearchRank,
        postLink,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
      };
    }
  }
}

const naverBlogSearchLink = (keyword: string) =>
  `https://m.blog.naver.com/SectionPostSearch.naver?orderType=sim&searchValue=${encodeURIComponent(
    keyword,
  )}`;

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
