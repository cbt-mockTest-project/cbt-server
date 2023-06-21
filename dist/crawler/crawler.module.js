"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlerModule = void 0;
const common_1 = require("@nestjs/common");
const crawler_resolver_1 = require("./crawler.resolver");
const crawler_service_1 = require("./crawler.service");
let CrawlerModule = class CrawlerModule {
};
CrawlerModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [crawler_resolver_1.CrawlerResolver, crawler_service_1.CrawlerService],
        exports: [crawler_service_1.CrawlerService, crawler_resolver_1.CrawlerResolver],
    })
], CrawlerModule);
exports.CrawlerModule = CrawlerModule;
//# sourceMappingURL=crawler.module.js.map