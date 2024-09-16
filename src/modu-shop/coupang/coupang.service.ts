import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GetProductListInput } from './dtos/get-product-list.dto';
import { generateHmac } from './utils';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CoupangDetailData } from './interface/coupang-detail';
import { JSDOM } from 'jsdom';

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
      const data = {
        ratingValue: jsonLdData.aggregateRating?.ratingValue || 0,
        ratingCount: jsonLdData.aggregateRating?.ratingCount || 0,
        discountRate: discountRate,
        description: jsonLdData.description,
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
}
