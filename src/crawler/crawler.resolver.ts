import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  NaverViewTapCrawlerOutput,
  NaverViewTapCrawlerInput,
} from './dtos/naverViewTapCrawler.dto';
import { CrawlerService } from './crawler.service';
import {
  NaverBlogViewMacroInput,
  NaverBlogViewMacroOutput,
} from './dtos/naverBlogViewMacro.dto';

@Resolver()
export class CrawlerResolver {
  constructor(private readonly naverViewTapCrawlerService: CrawlerService) {}
  @Query(() => NaverViewTapCrawlerOutput)
  async naverViewTapCrawlerTest(
    @Args('input')
    naverViewTapCrawlerTestInput: NaverViewTapCrawlerInput,
  ): Promise<NaverViewTapCrawlerOutput> {
    return this.naverViewTapCrawlerService.naverViewTapCrawler(
      naverViewTapCrawlerTestInput,
    );
  }

  @Mutation(() => NaverBlogViewMacroOutput)
  async naverBlogViewMacro(
    @Args('input')
    naverBlogViewMacroInput: NaverBlogViewMacroInput,
  ): Promise<NaverBlogViewMacroOutput> {
    return this.naverViewTapCrawlerService.naverBlogViewMacro(
      naverBlogViewMacroInput,
    );
  }
}
