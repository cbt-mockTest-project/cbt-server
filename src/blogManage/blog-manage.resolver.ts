import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  GetMyBlogPostRankOutput,
  GetMyBlogPostRankInput,
} from './dtos/get-my-blog-post-rank.dto';
import {
  NaverBlogViewMacroInput,
  NaverBlogViewMacroOutput,
} from './dtos/naver-blog-view-macro.dto';
import { BlogManageService } from './blog-manage.service';
import {
  GetKeywordSearchCountInput,
  GetKeywordSearchCountOutput,
} from './dtos/get-keyword-search-count.dto';
import {
  GetSearchAvailabilityInput,
  GetSearchAvailabilityOutput,
} from './dtos/get-search-availability.dto';
import {
  GetBlogCategoryListInput,
  GetBlogCategoryListOutput,
} from './dtos/get-blog-category-list.dto';
import {
  GetSearchRankInput,
  GetSearchRankOutput,
} from './dtos/get-search-rank.dto';
import { GetBlogInfoInput, GetBlogInfoOutput } from './dtos/get-blog-info.dto';

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

  @Query(() => GetKeywordSearchCountOutput)
  async getKeywordSearchCount(
    @Args('input')
    getKeywordSearchCountInput: GetKeywordSearchCountInput,
  ): Promise<GetKeywordSearchCountOutput> {
    return this.blogManageService.getKeywordSearchCount(
      getKeywordSearchCountInput,
    );
  }

  @Query(() => GetSearchAvailabilityOutput)
  async getSearchAvailability(
    @Args('input')
    getSearchAvailabilityInput: GetSearchAvailabilityInput,
  ): Promise<GetSearchAvailabilityOutput> {
    return this.blogManageService.getSearchAvailability(
      getSearchAvailabilityInput,
    );
  }

  @Query(() => GetBlogCategoryListOutput)
  async getBlogCategoryList(
    @Args('input') getBlogCategoryList: GetBlogCategoryListInput,
  ): Promise<GetBlogCategoryListOutput> {
    return this.blogManageService.getBlogCategoryList(getBlogCategoryList);
  }

  @Query(() => GetSearchRankOutput)
  async getSearchRank(
    @Args('input') getSearchRankInput: GetSearchRankInput,
  ): Promise<GetSearchRankOutput> {
    return this.blogManageService.getSearchRank(getSearchRankInput);
  }

  @Query(() => GetBlogInfoOutput)
  async getBlogInfo(
    @Args('input') getBlogInfoInput: GetBlogInfoInput,
  ): Promise<GetBlogInfoOutput> {
    return this.blogManageService.getBlogInfo(getBlogInfoInput);
  }
}
