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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlerResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const naverViewTapCrawler_dto_1 = require("./dtos/naverViewTapCrawler.dto");
const crawler_service_1 = require("./crawler.service");
const naverBlogViewMacro_dto_1 = require("./dtos/naverBlogViewMacro.dto");
let CrawlerResolver = class CrawlerResolver {
    constructor(naverViewTapCrawlerService) {
        this.naverViewTapCrawlerService = naverViewTapCrawlerService;
    }
    async naverViewTapCrawlerTest(naverViewTapCrawlerTestInput) {
        return this.naverViewTapCrawlerService.naverViewTapCrawler(naverViewTapCrawlerTestInput);
    }
    async naverBlogViewMacro(naverBlogViewMacroInput) {
        return this.naverViewTapCrawlerService.naverBlogViewMacro(naverBlogViewMacroInput);
    }
};
__decorate([
    (0, graphql_1.Query)(() => naverViewTapCrawler_dto_1.NaverViewTapCrawlerOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [naverViewTapCrawler_dto_1.NaverViewTapCrawlerInput]),
    __metadata("design:returntype", Promise)
], CrawlerResolver.prototype, "naverViewTapCrawlerTest", null);
__decorate([
    (0, graphql_1.Mutation)(() => naverBlogViewMacro_dto_1.NaverBlogViewMacroOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [naverBlogViewMacro_dto_1.NaverBlogViewMacroInput]),
    __metadata("design:returntype", Promise)
], CrawlerResolver.prototype, "naverBlogViewMacro", null);
CrawlerResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [crawler_service_1.CrawlerService])
], CrawlerResolver);
exports.CrawlerResolver = CrawlerResolver;
//# sourceMappingURL=crawler.resolver.js.map