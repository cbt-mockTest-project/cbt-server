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
exports.ZepUserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const zepUser_entity_1 = require("./entities/zepUser.entity");
const typeorm_2 = require("typeorm");
let ZepUserService = class ZepUserService {
    constructor(zepUser) {
        this.zepUser = zepUser;
    }
    async updateZepUser(updateZepUserInput) {
        try {
            const { nickname, zepId } = updateZepUserInput;
            const prevZepUser = await this.zepUser.findOne({
                where: { zep_id: zepId },
            });
            const newUser = prevZepUser
                ? this.zepUser.create({
                    nickname,
                    zep_id: zepId,
                    id: prevZepUser.id,
                })
                : this.zepUser.create({
                    nickname,
                    zep_id: zepId,
                });
            const zepUser = await this.zepUser.save(newUser);
            return {
                zepUser,
                ok: true,
            };
        }
        catch (e) {
            console.log(e);
            return {
                ok: false,
                error: '업데이트에 실패했습니다.',
            };
        }
    }
    async getZepUser(id) {
        try {
            const zepUser = await this.zepUser.findOne({
                where: { zep_id: id },
                relations: {
                    studyTimes: true,
                },
            });
            if (!zepUser) {
                return {
                    ok: false,
                    error: '유저를 찾을 수 없습니다.',
                };
            }
            return {
                ok: true,
                zepUser,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '유저를 불러오지 못했습니다.',
            };
        }
    }
};
ZepUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(zepUser_entity_1.ZepUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ZepUserService);
exports.ZepUserService = ZepUserService;
//# sourceMappingURL=zepUser.service.js.map