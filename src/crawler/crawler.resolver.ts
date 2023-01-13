import { CoreOutput } from 'src/common/dtos/output.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  NaverViewTapCrawlerOutput,
  NaverViewTapCrawlerInput,
} from './naverViewTapCrawler.dto';
import { CrawlerService } from './crawler.service';

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

  @Mutation(() => CoreOutput)
  async naverBlogViewMacro() {
    return this.naverViewTapCrawlerService.naverBlogViewMacro();
  }
}
