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
exports.TelegramService = void 0;
const common_constants_1 = require("../common/common.constants");
const common_1 = require("@nestjs/common");
const TelegramBot = require("node-telegram-bot-api");
let TelegramService = class TelegramService {
    constructor(options) {
        this.options = options;
    }
    async sendMessageToAlramChannelOfTelegram(sendMessageToAlramChannelOfTelegramInput) {
        try {
            const { message } = sendMessageToAlramChannelOfTelegramInput;
            const bot = new TelegramBot(this.options.token);
            bot.sendMessage(this.options.alramChannelId, message);
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '메시지 전송에 실패했습니다.',
            };
        }
    }
};
TelegramService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_constants_1.CONFIG_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], TelegramService);
exports.TelegramService = TelegramService;
//# sourceMappingURL=telegram.service.js.map