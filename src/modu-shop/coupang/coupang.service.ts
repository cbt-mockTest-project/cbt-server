import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GetProductListInput } from './dtos/get-product-list.dto';
import { generateHmac } from './utils';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';
import { CoupangDetailData } from './interface/coupang-detail';
import { JSDOM } from 'jsdom';
import { load } from 'cheerio';
import { CoupangSearchLog } from './entities/coupang-search-log';

const COUPANG_REQUEST_HEADERS = {
  Accept: '*/*',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
  Host: 'www.coupang.com',
  Cookie: '',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
};
function extractImageUrls(detailData: any): string[] {
  const content =
    detailData.details[0]?.vendorItemContentDescriptions[0]?.content;
  if (!content) return [];

  const imgRegex = /<img\s+src="([^"]+)"/g;
  const matches = content.matchAll(imgRegex);
  return Array.from(matches, (match) => match[1]);
}

function extractOgImageUrl(html: string): string {
  const $ = load(html);
  const ogImage = $('meta[property="og:image"]').attr('content');
  return ogImage;
}

function extractJsonLd(html: string): any {
  const jsonLdRegex =
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/;
  const match = html.match(jsonLdRegex);

  if (match && match[1]) {
    try {
      return JSON.parse(match[1]);
    } catch (error) {
      console.error('JSON 파싱 오류:', error);
      return null;
    }
  }

  return null;
}

function extractDiscountRate(htmlContent: string): number | null {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;

  const discountRateElement = document.querySelector('.discount-rate');

  if (discountRateElement) {
    const discountRateText = discountRateElement.textContent?.trim() || '';
    const discountRate = parseInt(discountRateText.replace('%', ''), 10) / 100;
    return isNaN(discountRate) ? 0 : discountRate;
  }

  return 0;
}

@Injectable()
export class CoupangService {
  constructor(
    @InjectRepository(Product)
    private readonly products: Repository<Product>,
    @InjectRepository(CoupangSearchLog)
    private readonly coupangSearchLogs: Repository<CoupangSearchLog>,
    private dataSource: DataSource,
  ) {}

  async requestProductListToCoupang(
    requestProductListToCoupangInput: GetProductListInput,
  ) {
    try {
      const { keyword } = requestProductListToCoupangInput;
      const REQUEST_METHOD = 'GET';
      const DOMAIN = 'https://api-gateway.coupang.com';
      const URL = `/v2/providers/affiliate_open_api/apis/openapi/products/search?keyword=${encodeURIComponent(
        keyword,
      )}&limit=10`;
      const REQUEST_URL = `${DOMAIN}${URL}`;
      const authorization = generateHmac(
        REQUEST_METHOD,
        URL,
        process.env.COUPANG_ACCESS_KEY,
        process.env.COUPANG_SECRET_KEY,
      );

      const { data } = await axios.get<{ data: { productData: Product[] } }>(
        REQUEST_URL,
        {
          headers: {
            Authorization: authorization,
          },
        },
      );

      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      let products: Product[] = [];
      try {
        products = await Promise.all(
          data.data.productData.map(async (data) => {
            const searchParams = new URLSearchParams(data.productUrl);
            const crawlData = await this.crawlProductDetailFromCoupang({
              productId: data.productId,
              itemId: searchParams.get('itemId'),
              vendorItemId: searchParams.get('vendorItemId'),
            });

            return {
              ...data,
              vendorItemId: searchParams.get('vendorItemId'),
              itemId: searchParams.get('itemId'),
              ratingValue: crawlData.data.ratingValue,
              ratingCount: Number(crawlData.data.ratingCount),
              imageUrls: crawlData.data.imageUrls,
              discountRate: crawlData.data.discountRate,
              description: crawlData.data.description,
            };
          }),
        );
        await queryRunner.manager.delete(Product, { keyword });
        await queryRunner.manager.save(
          Product,
          products.filter(
            (product, index, self) =>
              index ===
              self.findIndex((p) => p.productId === product.productId),
          ),
        );

        await queryRunner.commitTransaction();
      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
      } finally {
        await queryRunner.release();
      }
      return {
        ok: true,
        products,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  async crawlProductDetailFromCoupang({
    productId,
    itemId,
    vendorItemId,
  }: {
    productId: string;
    itemId?: string;
    vendorItemId?: string;
  }) {
    try {
      const { data: detailData } = await axios.get(
        `https://www.coupang.com/vp/products/${productId}`,
        {
          headers: COUPANG_REQUEST_HEADERS,
        },
      );
      const jsonLdData = extractJsonLd(detailData) as CoupangDetailData;
      const discountRate = extractDiscountRate(detailData);
      const ogImage = extractOgImageUrl(detailData);
      const data = {
        ratingValue: jsonLdData.aggregateRating?.ratingValue || 0,
        ratingCount: jsonLdData.aggregateRating?.ratingCount || 0,
        discountRate: discountRate,
        description: jsonLdData.description,
        productImage: 'https:' + ogImage,
        imageUrls: [],
      };
      if (vendorItemId && itemId) {
        const { data: detailDataForImageUrls } = await axios.get(
          `https://www.coupang.com/vp/products/${productId}/items/${itemId}/vendoritems/${vendorItemId}`,
          {
            headers: COUPANG_REQUEST_HEADERS,
          },
        );
        const imageUrls = extractImageUrls(detailDataForImageUrls);
        data.imageUrls = imageUrls;
      }

      return {
        ok: true,
        data,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  async getProductList(getProductListInput: GetProductListInput) {
    try {
      const { keyword, limit } = getProductListInput;

      const products = await this.products.find({
        where: { keyword },
        ...(limit && { take: limit }),
      });
      return {
        ok: true,
        products,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  async searchProductList(keyword: string) {
    try {
      const searchLog = await this.coupangSearchLogs.findOne({
        where: { keyword },
      });
      if (searchLog) {
        await this.coupangSearchLogs.update(
          { keyword },
          { count: searchLog.count + 1 },
        );
      } else {
        await this.coupangSearchLogs.save(
          this.coupangSearchLogs.create({ keyword, count: 1 }),
        );
      }
      let products = await this.products.find({
        where: { keyword },
      });
      // 업데이트된지 하루가 지났으면
      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      await this.crawlProductListFromCoupangV2(keyword);
      products = await this.products.find({
        where: { keyword },
      });
      if (
        (products.length > 0 && products[0].updated_at < oneDayAgo) ||
        products.length === 0
      ) {
        await this.crawlProductListFromCoupangV2(keyword);
        products = await this.products.find({
          where: { keyword },
        });
      }

      return {
        ok: true,
        products,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }

  async crawlProductListFromCoupang(keyword: string, isMobile?: boolean) {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      const { data } = await axios.get(
        `https://www.coupang.com/np/search?component=&q=${encodeURIComponent(
          keyword,
        )}&channel=user`,
        {
          headers: COUPANG_REQUEST_HEADERS,
        },
      );
      const $ = load(data);
      const $productList = $('.search-product-list');
      const productPromises: Promise<Product>[] = [];

      $productList.children('li').each((i, li) => {
        const rankedProduct = $(li).find('.number');
        if (!rankedProduct.text()) return;

        const productPromise = (async () => {
          const rawUrls = $(li).find('a').attr('href');
          const queryString = rawUrls.split('?')[1]; // URL에서 쿼리 문자열 부분만 추출
          const searchParams = new URLSearchParams(queryString);

          const itemId = searchParams.get('itemId');
          const vendorItemId = searchParams.get('vendorItemId');
          const productId = $(li).attr('data-product-id');
          const productUrl = `https://link.coupang.com/re/AFFSDP?lptag=AF8104485&subid=${
            isMobile ? 'android' : 'webpage00'
          }&pageKey=${productId}&vendorItemId=${vendorItemId}`;

          const productName = $(li).find('.name').text();
          const productPrice = Number(
            $(li).find('.price-value').text().replace(/,/g, ''),
          );
          const isRocket = $(li).find('.rocket').length > 0;
          const { data } = await this.crawlProductDetailFromCoupang({
            productId,
            itemId,
            vendorItemId,
          });

          return this.products.create({
            keyword,
            productId,
            productUrl,
            productName,
            productPrice: isNaN(productPrice) ? 0 : productPrice,
            isRocket,
            itemId,
            vendorItemId,
            productImage: data.productImage,
            ratingValue: data.ratingValue,
            ratingCount: Number(data.ratingCount),
            discountRate: data.discountRate,
            description: data.description,
            imageUrls: data.imageUrls,
          });
        })();

        productPromises.push(productPromise);
      });
      const products = await Promise.all(productPromises);

      await queryRunner.connect();
      await queryRunner.startTransaction();
      await queryRunner.manager.delete(Product, { keyword });
      await queryRunner.manager.save(
        Product,
        products.filter(
          (product, index, self) =>
            index === self.findIndex((p) => p.productId === product.productId),
        ),
      );
      await queryRunner.commitTransaction();
      return {
        ok: true,
        products,
      };
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      return {
        ok: false,
        error: error.message,
      };
    } finally {
      await queryRunner.release();
    }
  }

  async crawlProductListFromCoupangV2(keyword: string) {
    try {
      console.log('크롤링 시작');
      const { data } = await axios.get(
        `https://m.coupang.com/nm/search?q=${encodeURIComponent(keyword)}`,
        {
          headers: COUPANG_REQUEST_HEADERS,
          timeout: 10000,
        },
      );
      console.log('응답 받음: ', data.substring(0, 100));
      const $ = load(data);
      const $productList = $('#productList');
      const products: Product[] = [];
      $productList.children('li').each((i, li) => {
        const productId = $(li).attr('data-product-id');
        const itemId = $(li).attr('data-item-id');
        const vendorItemId = $(li).attr('data-vendor-item-id');
        const productUrl = `https://link.coupang.com/re/AFFSDP?lptag=AF8104485&pageKey=${productId}&vendorItemId=${vendorItemId}`;
        const productName = $(li).find('.title').text();
        const productPrice = $(li)
          .find('.discount-price')
          .find('strong')
          .text();
        const discountRate = $(li)
          .find('.base-discount-rate .percentage')
          .text();
        const productImage =
          'https:' + $(li).find('.thumbnail img').attr('src');
        const ratingValue = Number($(li).find('.rating').text()) || 0;
        const ratingCount =
          Number(
            $(li)
              .find('.rating-total-count')
              .text()
              .replace('(', '')
              .replace(')', ''),
          ) || 0;
        const product = {
          keyword,
          productId,
          productUrl,
          productName,
          productPrice: Number(productPrice.replace(/,/g, '')),
          discountRate: Number(discountRate.replace('%', '')) / 100,
          itemId,
          vendorItemId,
          ratingValue,
          ratingCount,
          productImage,
        };
        products.push(this.products.create(product));
      });
      await this.products.delete({
        productId: In(products.map((product) => product.productId)),
      });
      await this.products.save(
        products.filter(
          (product, index, self) =>
            index === self.findIndex((p) => p.productId === product.productId),
        ),
      );
      return {
        ok: true,
        data,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: error.message,
      };
    }
  }
}
