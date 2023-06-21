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
exports.NoticeService = void 0;
const user_entity_1 = require("./entities/user.entity");
const notice_entity_1 = require("./entities/notice.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let NoticeService = class NoticeService {
    constructor(notice, user) {
        this.notice = notice;
        this.user = user;
    }
    async createNotice(createNoticeInput) {
        try {
            const { content, reservationTime, userId, link } = createNoticeInput;
            const newNotice = this.notice.create({
                content,
                reservationTime: reservationTime || null,
                link: link || null,
                confirm: false,
                user: { id: userId },
            });
            await this.notice.save(newNotice);
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '알림을 만들 수 없습니다.',
            };
        }
    }
    async editNotice(editNoticeInput) {
        try {
            const { content, noticeId, reservationTime, confirm } = editNoticeInput;
            const prevNotice = await this.notice.findOne({ where: { id: noticeId } });
            if (!prevNotice) {
                return {
                    ok: false,
                    error: '존재하지 않는 알림입니다.',
                };
            }
            const newNotice = Object.assign(Object.assign({}, prevNotice), { content,
                reservationTime,
                confirm });
            await this.notice.save(newNotice);
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '알림을 수정할 수 없습니다.',
            };
        }
    }
    async deleteNotice(deleteNoticeInput) {
        try {
            const { noticeId } = deleteNoticeInput;
            await this.notice.delete({ id: noticeId });
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '알림을 삭제할 수 없습니다.',
            };
        }
    }
    async readMyNotice(user) {
        try {
            const notices = await this.notice.find({
                where: {
                    user: { id: user.id },
                },
                order: { confirm: 'ASC', created_at: 'DESC' },
            });
            return {
                ok: true,
                notices,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '알림을 불러올 수 없습니다.',
            };
        }
    }
    async deleteAllNoticesOfMe(user) {
        try {
            await this.notice.delete({ user: { id: user.id } });
            return { ok: true };
        }
        catch (_a) {
            return { ok: false, error: '알림을 삭제할 수 없습니다.' };
        }
    }
};
NoticeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notice_entity_1.Notice)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], NoticeService);
exports.NoticeService = NoticeService;
//# sourceMappingURL=notice.service.js.map