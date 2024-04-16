export interface InfluencerInfoOrigin {
  id: number;
  ownerId: number;
  urlId: string;
  myKeyword: MyKeyword;
  myKeywordUpdatedAt: string;
  profile: Profile;
  coverStyle: CoverStyle;
  stats: Stats;
  keywordChallengeInfo: KeywordChallengeInfo;
  activeChannels: ActiveChannel[];
  hasActiveChannels: boolean;
  showTotalFollowerCount: boolean;
  totalFollowerCount: number;
  subscribed: any;
  advertiseInfo: any;
  penalty: any[];
  lastPostCreatedAt: string;
  useTalkTalk: boolean;
  createdAt: string;
  keywordChallengePopUpView: any;
  theme: Theme;
  categoryMyType: string;
  references: References;
  lastTopicCreatedAt: string;
}

export interface MyKeyword {
  id: number;
  keyword: string;
  categoryId: number;
  categoryCode: string;
  category: string;
  expert: boolean;
  categoryGroupId: number;
}

export interface Profile {
  nickName: string;
  nickNameUpdatedAt: string;
  profileImageUrl: string;
  introduction: string;
  catchPhraseType: string;
  catchPhrase: string;
  followerCount: number;
  beauStar: boolean;
  nickNameUpdatedAtTimestamp: number;
}

export interface CoverStyle {
  template: number;
  paletteType: string;
  paletteCode: number;
  fontFamily: string;
  fontSize: number;
  backgroundUrl: string;
}

export interface Stats {
  subscriberCount: number;
}

export interface KeywordChallengeInfo {
  lastChallengedAt: string;
}

export interface ActiveChannel {
  id: number;
  serviceType: string;
  serviceId: string;
  status: string;
  providerStatus: string;
  title: string;
  followerCount: number;
  url: string;
  channelBadges?: any[];
  contents: any[];
  lastContentsCreatedAt: string;
  contentCount: any;
  removable: boolean;
  seq: number;
  updatedAt: string;
}

export interface Theme {
  animationCode: string;
  colorCode: string;
  subColorCode: string;
  fontFamilyCode: string;
  themeCode: string;
}

export interface References {
  NIC_RENEWAL_POPUP: boolean;
  SQUARE_SEASON1_POPUP: boolean;
  SQUARE_SEASON2_POPUP: boolean;
  BRAND_CONNECT_APPLY_EVENT_POPUP: boolean;
}
