// eslint-disable-next-line @typescript-eslint/no-var-requires
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { Injectable } from '@nestjs/common';
import { load } from 'cheerio';
import axios from 'axios';
import { GetSearchRankInput } from './dtos/get-search-rank.dto';
import { GetSearchAvailabilityInput } from './dtos/get-search-availability';
import { GetBlogPostsResponse } from 'src/types/dash-board';
import { GetNaverBlogVisitorCountInput } from './dtos/get-naver-blog-visitior-count.dto';
import { format } from 'date-fns';
import { GetMacroHistoryInput } from './dtos/get-macro.history';

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
            link: `https://m.blog.naver.com/${blogId}/${post.logNo}`,
            commentCount: post.commentCnt,
            likeCount: post.sympathyCnt,
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

  async getNaverBlogVisitorCount(
    getNaverBlogVisitorCountInput: GetNaverBlogVisitorCountInput,
  ) {
    try {
      const { blogId } = getNaverBlogVisitorCountInput;
      const { data } = await axios.get(
        `https://blog.naver.com/NVisitorgp4Ajax.nhn?blogId=${blogId}`,
      );
      const visitorCountList = [];
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
      return {
        ok: true,
        visitorCountList,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
      };
    }
  }

  async getMacroHistory(getMacroHistoryInput: GetMacroHistoryInput) {
    try {
      const getGoogleSheet = async () => {
        try {
          const formattedKey = process.env.GOOGLE_PRIVATE_KEY?.replace(
            /\\n/g,
            '\n',
          );
          const serviceAccountAuth = new JWT({
            key: formattedKey,
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
          });
          const doc = new GoogleSpreadsheet(
            process.env.GOOGLE_SHEET_ID || '',
            serviceAccountAuth,
          );
          await doc.loadInfo();
          return doc;
        } catch (error) {
          console.log(error);
        }
      };

      const { blogId, page } = getMacroHistoryInput;
      const doc = await getGoogleSheet();
      const sheet = doc.sheetsByIndex[0];
      let rows = await sheet.getRows();
      const dayString = format(
        new Date(Date.now() - 5 * (Number(page) - 1) * 24 * 60 * 60 * 1000),
        'yy-MM-dd',
      );
      const fiveDaysAgo = format(
        new Date(Date.now() - 5 * Number(page) * 24 * 60 * 60 * 1000),
        'yy-MM-dd',
      );
      rows = rows.filter(
        (row) =>
          row.get('date') > fiveDaysAgo &&
          row.get('date') <= dayString &&
          row.get('blogId') === blogId,
      );
      const result = [];
      rows.forEach((row) => {
        result.push({
          date: row.get('date'),
          count: row.get('count'),
        });
      });
      return {
        result,
        ok: true,
      };
    } catch (e) {
      console.log(e);
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
