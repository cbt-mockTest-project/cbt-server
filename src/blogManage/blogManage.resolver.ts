import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  GetMyBlogPostRankOutput,
  GetMyBlogPostRankInput,
} from './dtos/getMyBlogPostRank';
import {
  NaverBlogViewMacroInput,
  NaverBlogViewMacroOutput,
} from './dtos/naverBlogViewMacro.dto';
import { BlogManageService } from './blogManage.service';

@Resolver()
export class BlogManageResolver {
  constructor(private readonly blogManageService: BlogManageService) {}
  @Query(() => GetMyBlogPostRankOutput)
  async getMyBlogPostRank(
    @Args('input')
    getMyBlogPostRank: GetMyBlogPostRankInput,
  ): Promise<GetMyBlogPostRankOutput> {
    return this.blogManageService.getMyBlogPostRank(getMyBlogPostRank);
  }

  @Mutation(() => NaverBlogViewMacroOutput)
  async naverBlogViewMacro(
    @Args('input')
    naverBlogViewMacroInput: NaverBlogViewMacroInput,
  ): Promise<NaverBlogViewMacroOutput> {
    return this.blogManageService.naverBlogViewMacro(naverBlogViewMacroInput);
  }
}
