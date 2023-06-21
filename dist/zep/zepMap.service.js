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
exports.ZepMapService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const zepMapUserCount_entity_1 = require("./entities/zepMapUserCount.entity");
let ZepMapService = class ZepMapService {
    constructor(zepMapUserCount) {
        this.zepMapUserCount = zepMapUserCount;
    }
    async getZepMapUserCount() {
        try {
            const zepMapUserCount = await this.zepMapUserCount.find();
            return {
                zepMapUserCount,
                ok: true,
            };
        }
        catch (e) {
            console.log(e);
            return {
                ok: false,
                error: '유저 카운드 정보를 가져오는데 실패했습니다.',
            };
        }
    }
    async updateZepMapUserCount(updateZepMapUserCountInput) {
        try {
            const { mapId, userCount } = updateZepMapUserCountInput;
            const prevZepMapUserCount = await this.zepMapUserCount.findOne({
                where: { mapId },
            });
            const newZepMapUserCount = prevZepMapUserCount
                ? Object.assign(Object.assign({}, prevZepMapUserCount), { userCount }) : this.zepMapUserCount.create({
                mapId,
                userCount,
            });
            const zepMapUserCount = await this.zepMapUserCount.save(newZepMapUserCount);
            return {
                zepMapUserCount,
                ok: true,
            };
        }
        catch (_a) { }
    }
};
ZepMapService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(zepMapUserCount_entity_1.ZepMapUserCount)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ZepMapService);
exports.ZepMapService = ZepMapService;
//# sourceMappingURL=zepMap.service.js.map