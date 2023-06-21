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
exports.ZepCommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const zepComment_entity_1 = require("./entities/zepComment.entity");
const typeorm_2 = require("typeorm");
const zepPost_entity_1 = require("./entities/zepPost.entity");
const zepUser_entity_1 = require("./entities/zepUser.entity");
let ZepCommentService = class ZepCommentService {
    constructor(zepComment, zepPost, zepUser) {
        this.zepComment = zepComment;
        this.zepPost = zepPost;
        this.zepUser = zepUser;
    }
    async createZepComment(createZepCommentInput) {
        const { userId, postId, content } = createZepCommentInput;
        try {
            const zepUser = await this.zepUser.findOne({
                where: { zep_id: userId },
            });
            if (!zepUser) {
                return {
                    ok: false,
                    error: '존재하지 않는 유저입니다.',
                };
            }
            const zepPost = await this.zepPost.findOne({
                where: { id: postId },
            });
            if (!zepPost) {
                return {
                    ok: false,
                    error: '존재하지 않는 게시글입니다.',
                };
            }
            const comment = this.zepComment.create({
                content,
                zepUser,
                zepPost,
            });
            await this.zepComment.save(comment);
            return {
                ok: true,
                comment,
            };
        }
        catch (e) {
            return {
                ok: false,
                error: '댓글을 작성할 수 없습니다.',
            };
        }
    }
    async deleteZepComment(commentId, deleteZepCommentInput) {
        const { userId } = deleteZepCommentInput;
        try {
            const zepUser = await this.zepUser.findOne({
                where: { zep_id: userId },
            });
            if (!zepUser) {
                return {
                    ok: false,
                    error: '존재하지 않는 유저입니다.',
                };
            }
            const zepComment = await this.zepComment.findOne({
                where: { id: Number(commentId) },
                relations: {
                    zepUser: true,
                },
            });
            if (!zepComment) {
                return {
                    ok: false,
                    error: '존재하지 않는 댓글입니다.',
                };
            }
            if (zepComment.zepUser.id !== zepUser.id) {
                return {
                    ok: false,
                    error: '댓글을 삭제할 권한이 없습니다.',
                };
            }
            await this.zepComment.delete(commentId);
            return {
                ok: true,
            };
        }
        catch (e) {
            return {
                ok: false,
                error: '댓글을 삭제할 수 없습니다.',
            };
        }
    }
    async updateZepComment(commentId, updateZepCommentInput) {
        const { userId, content } = updateZepCommentInput;
        try {
            const zepUser = await this.zepUser.findOne({
                where: { zep_id: userId },
            });
            if (!zepUser) {
                return {
                    ok: false,
                    error: '존재하지 않는 유저입니다.',
                };
            }
            const zepComment = await this.zepComment.findOne({
                where: { id: Number(commentId) },
                relations: {
                    zepUser: true,
                },
            });
            if (!zepComment) {
                return {
                    ok: false,
                    error: '존재하지 않는 댓글입니다.',
                };
            }
            if (zepComment.zepUser.id !== zepUser.id) {
                return {
                    ok: false,
                    error: '댓글을 수정할 권한이 없습니다.',
                };
            }
            zepComment.content = content;
            await this.zepComment.save(zepComment);
            return {
                ok: true,
                comment: zepComment,
            };
        }
        catch (e) {
            return {
                ok: false,
                error: e.message,
            };
        }
    }
};
ZepCommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(zepComment_entity_1.ZepComment)),
    __param(1, (0, typeorm_1.InjectRepository)(zepPost_entity_1.ZepPost)),
    __param(2, (0, typeorm_1.InjectRepository)(zepUser_entity_1.ZepUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ZepCommentService);
exports.ZepCommentService = ZepCommentService;
//# sourceMappingURL=zepComment.service.js.map