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
exports.TelegramResolver = void 0;
const telegram_service_1 = require("./telegram.service");
const graphql_1 = require("@nestjs/graphql");
const telegram_dto_1 = require("./telegram.dto");
let TelegramResolver = class TelegramResolver {
    constructor(telegramService) {
        this.telegramService = telegramService;
    }
    async sendMessageToAlramChannelOfTelegram(sendMessageToAlramChannelOfTelegramInput) {
        return this.telegramService.sendMessageToAlramChannelOfTelegram(sendMessageToAlramChannelOfTelegramInput);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => telegram_dto_1.SendMessageToAlramChannelOfTelegramOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegram_dto_1.SendMessageToAlramChannelOfTelegramInput]),
    __metadata("design:returntype", Promise)
], TelegramResolver.prototype, "sendMessageToAlramChannelOfTelegram", null);
TelegramResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [telegram_service_1.TelegramService])
], TelegramResolver);
exports.TelegramResolver = TelegramResolver;
//# sourceMappingURL=telegram.resolver.js.map