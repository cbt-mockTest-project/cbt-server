import { NaverViewTapCrawlerInput, NaverViewTapCrawlerOutput } from './dtos/naverViewTapCrawler.dto';
import { TelegramService } from './../telegram/telegram.service';
import { NaverBlogViewMacroInput, NaverBlogViewMacroOutput } from './dtos/naverBlogViewMacro.dto';
export declare class CrawlerService {
    private readonly telegramService;
    constructor(telegramService: TelegramService);
    naverViewTapCrawler(naverViewTapCrawlerInput: NaverViewTapCrawlerInput): Promise<NaverViewTapCrawlerOutput>;
    naverBlogViewMacro(naverBlogViewMacroInput: NaverBlogViewMacroInput): Promise<NaverBlogViewMacroOutput>;
}
