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
exports.SchedulerService = void 0;
const telegram_service_1 = require("./../telegram/telegram.service");
const mock_exam_question_entity_1 = require("./../mock-exams/entities/mock-exam-question.entity");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const crawler_service_1 = require("../crawler/crawler.service");
const visit_service_1 = require("../visit/visit.service");
const user_service_1 = require("../users/user.service");
let SchedulerService = class SchedulerService {
    constructor(mockExamQuestions, configService, crawlerService, visitService, telegramService, userService) {
        this.mockExamQuestions = mockExamQuestions;
        this.configService = configService;
        this.crawlerService = crawlerService;
        this.visitService = visitService;
        this.telegramService = telegramService;
        this.userService = userService;
    }
    async clearVisit() {
        if (process.env.NODE_ENV === 'dev') {
            return;
        }
        try {
            const { totalViewCount, todayViewCount } = await this.visitService.createVisitHistory();
            await this.visitService.clearVisit();
            await this.telegramService.sendMessageToAlramChannelOfTelegram({
                message: `오늘의 방문자수는 ${todayViewCount}명입니다.\n지금까지 총 방문자수는 ${totalViewCount}명입니다.`,
            });
        }
        catch (_a) {
            await this.telegramService.sendMessageToAlramChannelOfTelegram({
                message: `방문자수 기록 실패`,
            });
        }
    }
};
__decorate([
    (0, schedule_1.Cron)('0 55 23 * * *', { timeZone: 'Asia/Seoul' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchedulerService.prototype, "clearVisit", null);
SchedulerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mock_exam_question_entity_1.MockExamQuestion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService,
        crawler_service_1.CrawlerService,
        visit_service_1.VisitService,
        telegram_service_1.TelegramService,
        user_service_1.UserService])
], SchedulerService);
exports.SchedulerService = SchedulerService;
//# sourceMappingURL=scheduler.service.js.map