import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { CoupangService } from './coupang.service';
import { GetProductListInput } from './dtos/get-product-list.dto';

@Controller('modu-shop/coupang')
export class CoupangController {
  constructor(private readonly coupangService: CoupangService) {}

  @Post('/product')
  async requestProductListToCoupang(
    @Body() getProductListInput: GetProductListInput,
  ) {
    return this.coupangService.requestProductListToCoupang(getProductListInput);
  }

  @Get('/product')
  async getProductList(@Query() getProductListInput: GetProductListInput) {
    return this.coupangService.getProductList(getProductListInput);
  }

  @Get('/product/crawl/:productId')
  async crawlProductDetailFromCoupang(
    @Param('productId') productId: string,
    @Query('itemId') itemId: string,
    @Query('vendorItemId') vendorItemId: string,
  ) {
    return this.coupangService.crawlProductDetailFromCoupang({
      productId,
      itemId,
      vendorItemId,
    });
  }

  @Get('/search/crawl/v2')
  async crawlProductListFromCoupangV2(@Query('keyword') keyword: string) {
    return this.coupangService.crawlProductListFromCoupangV2(keyword);
  }

  @Get('/search/crawl/:keyword')
  async crawlProductListFromCoupang(@Param('keyword') keyword: string) {
    return this.coupangService.crawlProductListFromCoupang(keyword);
  }

  @Get('/search/list')
  async getProductListFromCoupang(@Query('keyword') keyword: string) {
    return this.coupangService.searchProductList(keyword);
  }
}
