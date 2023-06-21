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
exports.VisitService = void 0;
const visitHistory_entity_1 = require("./entities/visitHistory.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const visit_entity_1 = require("./entities/visit.entity");
const date_fns_1 = require("date-fns");
let VisitService = class VisitService {
    constructor(visit, visitHistory) {
        this.visit = visit;
        this.visitHistory = visitHistory;
    }
    async createVisit(user) {
        try {
            const newVisit = this.visit.create({ user });
            await this.visit.save(newVisit);
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'fail visit count',
            };
        }
    }
    async clearVisit() {
        try {
            await this.visit.clear();
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'fail visit clear',
            };
        }
    }
    async readVisitCount() {
        try {
            const count = await this.visit.count();
            return {
                ok: true,
                count,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'fail read visit count',
            };
        }
    }
    async createVisitHistory() {
        try {
            const today = new Date();
            const formatedToday = (0, date_fns_1.format)(today, 'yy-MM-dd');
            const formatedYesterday = (0, date_fns_1.format)((0, date_fns_1.subDays)(today, 1), 'yy-MM-dd');
            const todayViewCount = await this.visit.count();
            const todayVisitHistory = await this.visitHistory.findOne({
                where: { dateString: formatedToday },
            });
            if (todayVisitHistory) {
                return {
                    ok: false,
                    error: '오늘의 기록이 이미 존재합니다.',
                };
            }
            const yesterdayVisitHistory = await this.visitHistory.findOne({
                where: { dateString: formatedYesterday },
            });
            if (!yesterdayVisitHistory) {
                return {
                    ok: false,
                    error: '이전날의 기록이 없습니다.',
                };
            }
            const totalViewCount = yesterdayVisitHistory.totalViewCount + todayViewCount;
            const newTodayVisitHistory = this.visitHistory.create({
                totalViewCount,
                todayViewCount,
                dateString: formatedToday,
            });
            const result = await this.visitHistory.save(newTodayVisitHistory);
            return {
                ok: true,
                totalViewCount: result.totalViewCount,
                todayViewCount: result.todayViewCount,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '오늘의 방문기록을 실패했습니다.',
            };
        }
    }
    async readVisitHistory() {
        const todayViewCount = await this.visit.count();
        const formatedYesterday = (0, date_fns_1.format)((0, date_fns_1.subDays)(new Date(), 1), 'yy-MM-dd');
        const visitHistory = await this.visitHistory.findOne({
            where: {
                dateString: formatedYesterday,
            },
        });
        if (!visitHistory) {
            return {
                ok: false,
                error: '기록이 존재하지 않습니다.',
            };
        }
        const { totalViewCount, todayViewCount: yesterdayViewCount } = visitHistory;
        return {
            ok: true,
            today: todayViewCount,
            yesterday: yesterdayViewCount,
            total: totalViewCount,
        };
    }
};
VisitService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(visit_entity_1.Visit)),
    __param(1, (0, typeorm_1.InjectRepository)(visitHistory_entity_1.VisitHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], VisitService);
exports.VisitService = VisitService;
//# sourceMappingURL=visit.service.js.map