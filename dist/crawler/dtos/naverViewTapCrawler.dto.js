"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaverViewTapCrawlerOutput = exports.NaverViewTapCrawlerInput = exports.SearchCounts = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
let SearchCount = class SearchCount {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], SearchCount.prototype, "all", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], SearchCount.prototype, "blog", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SearchCount.prototype, "url", void 0);
SearchCount = __decorate([
    (0, graphql_1.ObjectType)()
], SearchCount);
let SearchCounts = class SearchCounts {
};
__decorate([
    (0, graphql_1.Field)(() => SearchCount),
    __metadata("design:type", SearchCount)
], SearchCounts.prototype, "naver", void 0);
__decorate([
    (0, graphql_1.Field)(() => SearchCount),
    __metadata("design:type", SearchCount)
], SearchCounts.prototype, "daum", void 0);
SearchCounts = __decorate([
    (0, graphql_1.ObjectType)()
], SearchCounts);
exports.SearchCounts = SearchCounts;
let PostInfo = class PostInfo {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PostInfo.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PostInfo.prototype, "link", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PostInfo.prototype, "content", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PostInfo.prototype, "thumb", void 0);
PostInfo = __decorate([
    (0, graphql_1.ObjectType)()
], PostInfo);
let NaverViewTapCrawlerInput = class NaverViewTapCrawlerInput {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], NaverViewTapCrawlerInput.prototype, "keyword", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], NaverViewTapCrawlerInput.prototype, "blogName", void 0);
NaverViewTapCrawlerInput = __decorate([
    (0, graphql_1.InputType)()
], NaverViewTapCrawlerInput);
exports.NaverViewTapCrawlerInput = NaverViewTapCrawlerInput;
let NaverViewTapCrawlerOutput = class NaverViewTapCrawlerOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], NaverViewTapCrawlerOutput.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)(() => SearchCounts, { nullable: true }),
    __metadata("design:type", SearchCounts)
], NaverViewTapCrawlerOutput.prototype, "searchCounts", void 0);
__decorate([
    (0, graphql_1.Field)(() => PostInfo, { nullable: true }),
    __metadata("design:type", PostInfo)
], NaverViewTapCrawlerOutput.prototype, "postInfo", void 0);
NaverViewTapCrawlerOutput = __decorate([
    (0, graphql_1.ObjectType)()
], NaverViewTapCrawlerOutput);
exports.NaverViewTapCrawlerOutput = NaverViewTapCrawlerOutput;
//# sourceMappingURL=naverViewTapCrawler.dto.js.map