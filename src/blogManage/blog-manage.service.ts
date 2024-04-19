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
import {
  BlogInfo,
  BlogVisitor,
  GetBlogInfoInput,
  GetBlogInfoOutput,
  InfluencerInfo,
} from './dtos/get-blog-info.dto';
import {
  GetBlogInfoFromNaverInput,
  NaverBlogInfo,
} from './dtos/get-blog-info-from-naver.dto';
import {
  GetBlogPostDetailInput,
  GetBlogPostDetailOutput,
} from './dtos/get-blog-post-detail.dto';
import { InfluencerInfoOrigin } from './interfaces/get-influencer-info';
import { PostMorphemeAnalysisResponse } from './interfaces/post-morpheme-analysis';
import { countWordInText } from 'src/utils/utils';
import { format } from 'date-fns';

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

      await Promise.all([...exploreNaver]);

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
  async getRefreshtoken() {
    try {
      const NID_SES = await this.blogStorage.findOne({
        where: {
          key: 'NID_SES',
        },
      });
      const NID_AUT = await this.blogStorage.findOne({
        where: {
          key: 'NID_AUT',
        },
      });
      const { data } = await axios.post<{
        token: string;
        refreshToken: string;
      }>(`https://searchad.naver.com/auth/local/naver-cookie`, undefined, {
        headers: {
          cookie: `NID_AUT=${NID_AUT.value};NID_SES=${NID_SES.value};`,
        },
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async getKeywordSearchCount(
    getKeywordSearchCountInput: GetKeywordSearchCountInput,
  ): Promise<GetKeywordSearchCountOutput> {
    try {
      const token = await this.getRefreshtoken();
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

  getBlogPostAPI = (blogId: string, postId: string) =>
    axios.get<string>(`https://m.blog.naver.com/${blogId}/${postId}`);

  postMorphemeAnalysis = (text: string) =>
    axios.post<PostMorphemeAnalysisResponse>(
      'http://aiopen.etri.re.kr:8000/WiseNLU_spoken',
      {
        request_id: 'reserved field',
        argument: {
          text: text,
          analysis_code: 'morp',
        },
      },
      {
        headers: {
          Authorization: process.env.MORPHEME_AUTH_KEY,
        },
      },
    );

  getLikeCountAPI = (blogId: string, postId: string) =>
    axios.get<{ result: { totalCount: number; postAddDate: number } }>(
      `https://m.blog.naver.com/api/blogs/${blogId}/posts/${postId}/sympathy-users?blogId=${blogId}&logNo=${postId}`,
      {
        headers: {
          referer: `https://m.blog.naver.com/${blogId}/${postId}`,
        },
      },
    );

  async getBlogPostDetail(
    getBlogPostDetailInput: GetBlogPostDetailInput,
  ): Promise<GetBlogPostDetailOutput> {
    const { postId, blogId } = getBlogPostDetailInput;
    const { data } = await this.getBlogPostAPI(blogId, postId);
    const { data: getLikeData } = await this.getLikeCountAPI(blogId, postId);

    const mainClass = '.se-main-container';
    const textClass = '.se-text-paragraph';
    const tagClass = '.__se-hash-tag';
    const titleClass = '.se-title-text';
    const commentAndLikeBox = '.section_w';
    const imageClass = '.se-image-resource';
    const likeCount = getLikeData.result.totalCount;
    const postAddDate = format(
      new Date(getLikeData.result.postAddDate),
      'yy.MM.dd',
    );
    const $ = load(data);
    let textLength = 0;
    let imageCount = 0;
    let commentCount = 0;
    let text = '';
    let title = '';
    const linkSet = new Set<string>();
    const tagList = [];
    $(commentAndLikeBox).each((i, el) => {
      $(el)
        .find('.btn_reply em')
        .each((i, el) => {
          commentCount = Number($(el).text());
        });
    });
    $(titleClass).each((i, el) => {
      title = $(el).text();
    });
    $(mainClass)
      .find(imageClass)
      .each((i, el) => {
        imageCount++;
      });
    $(mainClass)
      .find('a')
      .each((i, el) => {
        if ($(el).attr('href') === '#') return;
        linkSet.add($(el).attr('href'));
      });
    $(tagClass).each((i, el) => {
      tagList.push($(el).text());
    });
    $(textClass).each((i, el) => {
      text += $(el).text() + '\n';
      textLength += $(el).text().replace(/ /g, '').length;
    });

    const { data: morphemeData } = await this.postMorphemeAnalysis(text);
    let morphemeList = [];
    morphemeData.return_object.sentence.forEach((sentence) => {
      sentence.word.map((word) => {
        morphemeList.push({
          word: word.text,
          count: countWordInText(text, word.text),
        });
      });
    });
    morphemeList = morphemeList.sort((a, b) => b.count - a.count);
    const uniqueMorphemeList = morphemeList
      .filter(
        (morpheme, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.word === morpheme.word &&
              t.word.length > 1 &&
              t.count === morpheme.count &&
              /^[가-힣a-zA-Z]*$/.test(t.word),
          ),
      )
      .slice(0, 10);
    const linkList = Array.from(linkSet);

    return {
      postAddDate,
      imageCount,
      commentCount,
      title,
      likeCount,
      uniqueMorphemeList,
      linkList,
      tagList,
      text,
      textLength,
      ok: true,
    };
  }

  async getSearchAvailability(
    getSearchAvailabilityInput: GetSearchAvailabilityInput,
  ): Promise<GetSearchAvailabilityOutput> {
    try {
      const { itemCount, page } = getSearchAvailabilityInput;
      const blogId = this.extractBlogId(getSearchAvailabilityInput.blogId);
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
          const { data } = await axios.get(
            naverPostSearchForSearchAvailability(
              `"${removeEmojis(post.titleWithInspectMessage).replace(
                /"/g,
                "'",
              )}"`,
            ),
          );

          const { textLength, imageCount } = await this.getBlogPostDetail({
            blogId,
            postId: String(post.logNo),
          });
          if (data.contents.includes(blogId)) {
            isSearchAvailability = true;
          } else {
            const { data } = await axios.get(
              naverPostSearchForSearchAvailability(
                `"${removeEmojis(post.titleWithInspectMessage)}"`,
              ),
            );
            if (data.contents.includes(blogId)) {
              isSearchAvailability = true;
            }
          }
          return {
            link: `https://m.blog.naver.com/${blogId}/${post.logNo}`,
            commentCnt: post.commentCnt,
            sympathyCnt: post.sympathyCnt,
            titleWithInspectMessage: post.titleWithInspectMessage,
            logNo: post.logNo,
            thumbnailCount: imageCount,
            textLength,
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
      const blogId = this.extractBlogId(getBlogCategoryListInput.blogId);
      const endPoint = `https://m.blog.naver.com/api/blogs/${blogId}/category-list`;
      const { data } = await axios.get<{
        isSuccess: boolean;
        result: { mylogCategoryList: BlogCategory[]; mylogPostCount: number };
      }>(endPoint, {
        headers: {
          referer: `https://m.blog.naver.com/${blogId}?tab=1`,
        },
      });

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
      const { keyword } = getSearchRankInput;
      const blogId = this.extractBlogId(getSearchRankInput.blogId);
      let naverPostOffSet = 1;
      let naverBlogSearchRank = 0;
      let naverSmartSearchRank = 0;
      let naverSmartSearchTitle = '';
      let postLink = '';

      const naverBlogSearchLink = (start: number) =>
        `https://search.naver.com/search.naver?ssc=tab.blog.all&query=${encodeURIComponent(
          keyword,
        )}&start=${start}`;
      const naverBasicSearchLink = `https://m.search.naver.com/search.naver?sm=mtb_hty.top&where=m&ssc=tab.m.all&9&query=${encodeURIComponent(
        keyword,
      )}`;
      const { data } = await axios.get(naverBasicSearchLink);
      const $ = load(data);
      $('a.name').each((i, el) => {
        if ($(el).attr('href').split('/')[3] === blogId) {
          naverSmartSearchTitle = $(el)
            .parents('.api_subject_bx')
            .find('.title')
            .text();
          let rankCount = 0;
          $(el)
            .parents('.api_subject_bx')
            .find('ul')
            .find('a.name')
            .each((i, el) => {
              rankCount++;
              if ($(el).attr('href').includes(blogId)) {
                naverSmartSearchRank = rankCount;
              }
            });
        }
      });

      $('a.fds-thumb-anchor').each((i, el) => {
        if ($(el).attr('href').split('/')[3].split('?')[0] === blogId) {
          naverSmartSearchTitle = $(el)
            .parents('.api_subject_bx')
            .find('.fds-comps-header-headline')
            .text();
          let rankCount = 0;
          $(el)
            .parents('.api_subject_bx')
            .find('a.fds-thumb-anchor')
            .each((i, el) => {
              rankCount++;
              if ($(el).attr('href').includes(blogId)) {
                naverSmartSearchRank = rankCount;
              }
            });
        }
      });
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

      return {
        ok: true,
        naverBlogSearchRank,
        naverSmartSearchTitle,
        naverSmartSearchRank,
        postLink,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
      };
    }
  }

  async getBlogVisitiorCount(blogId: string) {
    try {
      const { data } = await axios.get(
        `https://blog.naver.com/NVisitorgp4Ajax.nhn?blogId=${blogId}`,
      );
      const visitorCountList: BlogVisitor[] = [];
      const $ = load(data);
      $('visitorcnt').each((i, el) => {
        const visitorCount = {
          date:
            $(el).attr('id').slice(2, 4) +
            '-' +
            $(el).attr('id').slice(4, 6) +
            '-' +
            $(el).attr('id').slice(6, 8),
          visitor: $(el).attr('cnt'),
        };
        visitorCountList.unshift(visitorCount);
      });
      return visitorCountList;
    } catch {
      return [];
    }
  }

  async getInfluencerInfo(
    blogId: string,
  ): Promise<InfluencerInfoOrigin | null> {
    const influencerEndPoint = `https://gw.in.naver.com/home/api/v1/space-by-channel?serviceId=${blogId}&serviceType=NBLOG`;
    try {
      const { data } = await axios.get<InfluencerInfoOrigin>(
        influencerEndPoint,
      );
      return data;
    } catch (e) {
      return null;
    }
  }

  async getBlogInfoFromNaver(
    getBlogInfoFromNaverInput: GetBlogInfoFromNaverInput,
  ) {
    const blogId = this.extractBlogId(getBlogInfoFromNaverInput.blogId);
    try {
      const { data } = await axios.get(
        `
        https://m.blog.naver.com/rego/BlogInfo.naver?blogId=${blogId}`,
        {
          headers: {
            referer: `https://m.blog.naver.com/${blogId}`,
            accept: 'application/json',
          },
        },
      );
      const parsedData = JSON.parse(
        JSON.stringify(data.replace(`)]}',`, '').trim()),
      );
      return JSON.parse(parsedData).result as NaverBlogInfo;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getBlogInfo(
    getBlogInfoInput: GetBlogInfoInput,
  ): Promise<GetBlogInfoOutput> {
    try {
      const blogId = this.extractBlogId(getBlogInfoInput.blogId);
      const blogInfo: BlogInfo = {
        influencerInfo: null,
        blogVisitor: [],
        subscriberCount: 0,
        totalVisitorCount: 0,
        blogName: '',
        blogDirectoryName: '',
      };
      const [influencerInfo, blogVisitor, naverBlogInfo] = await Promise.all([
        this.getInfluencerInfo(blogId),
        this.getBlogVisitiorCount(blogId),
        this.getBlogInfoFromNaver({ blogId }),
      ]);
      if (influencerInfo) {
        const formattedInfluencerInfo: InfluencerInfo = {
          nickName: influencerInfo.profile.nickName,
          keyword: influencerInfo.myKeyword.keyword,
          subscriberCount: influencerInfo.stats.subscriberCount,
          introduction: influencerInfo.profile.introduction,
          category: influencerInfo.myKeyword.category,
          url: `https://in.naver.com/${influencerInfo.urlId}`,
        };
        blogInfo.influencerInfo = formattedInfluencerInfo;
      }
      blogInfo.blogVisitor = blogVisitor;
      if (naverBlogInfo) {
        blogInfo.blogName = naverBlogInfo.blogName;
        blogInfo.blogDirectoryName = naverBlogInfo.blogDirectoryName;
        blogInfo.subscriberCount = naverBlogInfo.subscriberCount;
        blogInfo.totalVisitorCount = naverBlogInfo.totalVisitorCount;
      }
      return {
        blogInfo,
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
      };
    }
  }

  extractBlogId(urlOrId: string) {
    // URL에서 호스트 이름 다음에 오는 첫 번째 경로 세그먼트를 blogId로 간주합니다.
    const match = urlOrId.match(/blog\.naver\.com\/([^\/\?]+)\/?/);
    return match ? match[1] : urlOrId;
  }
}

const naverPostSearchForSearchAvailability = (keyword: string) =>
  `https://s.search.naver.com/p/review/47/search.naver?ssc=tab.blog.all&api_type=4&query=${encodeURIComponent(
    keyword,
  )}`;

const removeEmojis = (str: string): string => {
  // 이모지 및 특정 유니코드 문자를 포함하는 정규 표현식
  const emojiRegex =
    /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{2B55}\u{2934}\u{2935}\u{2B05}\u{2B06}\u{2B07}\u{2B1B}\u{2B1C}\u{2B50}\u{2B55}\u{3030}\u{303D}\u{3297}\u{3299}\u{FE0F}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]+/gu;

  // 정규 표현식을 사용하여 이모지 제거
  return str.replace(emojiRegex, '');
};

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
