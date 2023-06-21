import { NaverViewTapCrawlerOutput, NaverViewTapCrawlerInput } from './dtos/naverViewTapCrawler.dto';
import { CrawlerService } from './crawler.service';
import { NaverBlogViewMacroInput, NaverBlogViewMacroOutput } from './dtos/naverBlogViewMacro.dto';
export declare class CrawlerResolver {
    private readonly naverViewTapCrawlerService;
    constructor(naverViewTapCrawlerService: CrawlerService);
    naverViewTapCrawlerTest(naverViewTapCrawlerTestInput: NaverViewTapCrawlerInput): Promise<NaverViewTapCrawlerOutput>;
    naverBlogViewMacro(naverBlogViewMacroInput: NaverBlogViewMacroInput): Promise<NaverBlogViewMacroOutput>;
}
