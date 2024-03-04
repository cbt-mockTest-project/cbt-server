import { Controller, Get, Query } from '@nestjs/common';
import { DashBoardService } from './dash-board.service';
import { GetSearchRankInput } from './dtos/get-search-rank.dto';
import { GetSearchAvailabilityInput } from './dtos/get-search-availability';
import { NaverBlogViewMacroInput } from './dtos/naver-blog-view-macro.dto';

@Controller('dash-board')
export class DashBoardController {
  constructor(private readonly dashBoardService: DashBoardService) {}

  @Get('search-rank')
  getKeywordRank(@Query() getSearchRankInput: GetSearchRankInput) {
    return this.dashBoardService.getSearchdRank(getSearchRankInput);
  }

  @Get('search-availability')
  getSearchAvailability(
    @Query() getSearchAvailabilityInput: GetSearchAvailabilityInput,
  ) {
    return this.dashBoardService.getSearchAvailability(
      getSearchAvailabilityInput,
    );
  }

  @Get('naver-blog-view-macro')
  naverBlogViewMacro(
    @Query() naverBlogViewMacroInput: NaverBlogViewMacroInput,
  ) {
    return this.dashBoardService.naverBlogViewMacro(naverBlogViewMacroInput);
  }
}
