import { CoreOutput } from 'src/common/dtos/output.dto';
declare class SearchCount {
    all: number;
    blog: number;
    url: string;
}
export declare class SearchCounts {
    naver: SearchCount;
    daum: SearchCount;
}
declare class PostInfo {
    title: string;
    link: string;
    content: string;
    thumb: string;
}
export declare class NaverViewTapCrawlerInput {
    keyword: string;
    blogName: string;
}
export declare class NaverViewTapCrawlerOutput extends CoreOutput {
    message?: string;
    searchCounts?: SearchCounts;
    postInfo?: PostInfo;
}
export {};
