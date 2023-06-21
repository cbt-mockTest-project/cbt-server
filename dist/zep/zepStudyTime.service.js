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
exports.ZepStudyTimeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const zepUser_entity_1 = require("./entities/zepUser.entity");
const typeorm_2 = require("typeorm");
const zepStudyTime_entity_1 = require("./entities/zepStudyTime.entity");
let ZepStudyTimeService = class ZepStudyTimeService {
    constructor(zepUser, zepStudyTime) {
        this.zepUser = zepUser;
        this.zepStudyTime = zepStudyTime;
    }
    async updateZepStudyTime(updateZepStudyTimeInput) {
        try {
            const { studyTime, grassCount, zepId, date } = updateZepStudyTimeInput;
            const zepUser = await this.zepUser.findOne({ where: { zep_id: zepId } });
            if (!zepUser) {
                return {
                    ok: false,
                    error: '유저를 찾을 수 없습니다.',
                };
            }
            const studyTimeToday = await this.zepStudyTime.findOne({
                where: { zepUser: { zep_id: zepId }, date },
            });
            const zepStudyTime = await this.zepStudyTime.save({
                id: studyTimeToday && studyTimeToday.id,
                zepUser,
                grass_count: grassCount,
                study_time: studyTime,
                date,
            });
            return {
                ok: true,
                zepStudyTime,
            };
        }
        catch (e) {
            return {
                ok: false,
                error: '업데이트에 실패했습니다.',
            };
        }
    }
};
ZepStudyTimeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(zepUser_entity_1.ZepUser)),
    __param(1, (0, typeorm_1.InjectRepository)(zepStudyTime_entity_1.ZepStudyTime)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ZepStudyTimeService);
exports.ZepStudyTimeService = ZepStudyTimeService;
//# sourceMappingURL=zepStudyTime.service.js.map