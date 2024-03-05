import { Controller, Get, Query } from '@nestjs/common';
import { DashBoardService } from './dash-board.service';
import { GetSearchRankInput } from './dtos/get-search-rank.dto';
import { GetSearchAvailabilityInput } from './dtos/get-search-availability';
import { GetNaverBlogVisitorCountInput } from './dtos/get-naver-blog-visitior-count.dto';
import { GetMacroHistoryInput } from './dtos/get-macro.history';

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

  @Get('naver-blog-visitor-count')
  getNaverBlogVisitorCount(
    @Query() getNaverBlogVisitorCountInput: GetNaverBlogVisitorCountInput,
  ) {
    return this.dashBoardService.getNaverBlogVisitorCount(
      getNaverBlogVisitorCountInput,
    );
  }

  @Get('macro-history')
  getMacroHistory(@Query() getMacroHistoryInput: GetMacroHistoryInput) {
    return this.dashBoardService.getMacroHistory(getMacroHistoryInput);
  }
}
