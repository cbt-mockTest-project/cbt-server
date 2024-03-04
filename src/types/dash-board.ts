export interface GetBlogPostsResponse {
  isSuccess: boolean;
  result: GetBlogPostsResult;
}

export interface GetBlogPostsResult {
  page: number;
  categoryNo: number;
  categoryName: string;
  totalCount: number;
  items: Post[];
}

export interface Post {
  domainIdOrBlogId: string;
  logNo: number;
  titleWithInspectMessage: string;
  commentCnt: number;
  sympathyCnt: number;
  briefContents: string;
  categoryOpenYn: boolean;
  categoryBlockYn: boolean;
  categoryName: string;
  thumbnailList: ThumbnailList[];
  scraped: boolean;
  addDate: number;
  categoryNo: number;
  openGraphLink: any;
  allOpenPost: boolean;
  memolog: boolean;
  outSideAllow: boolean;
  scrapType: number;
  smartEditorVersion: number;
  readCount: any;
  placeName?: string;
  thisDayPostInfo: any;
  searchYn: boolean;
  product: any;
  hasThumbnail: boolean;
  isVRThumbnail: boolean;
  isVideoThumbnail: boolean;
  videoPlayTime: any;
  thumbnailUrl: string;
  videoAniThumbnailUrl: string;
  isPortraitThumbnail: boolean;
  mp4: any;
  buddyOpen: boolean;
  sympathyArrowVisible: boolean;
  bothBuddyOpen: boolean;
  marketPost: boolean;
  thumbnailCount: number;
  notOpen: boolean;
  commentArrowVisible: boolean;
  postBlocked: boolean;
}

export interface ThumbnailList {
  type: string;
  encodedThumbnailUrl: string;
  videoAniThumbnailUrl: string;
  videoPlayTime?: number;
  isPortraitThumbnail: boolean;
  videoThumbnail: boolean;
  vrthumbnail: boolean;
}
