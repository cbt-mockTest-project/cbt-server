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
exports.PostCommentLikeService = void 0;
const postComment_entity_1 = require("./entities/postComment.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const postCommentLike_entity_1 = require("./entities/postCommentLike.entity");
let PostCommentLikeService = class PostCommentLikeService {
    constructor(postCommentLike, comment) {
        this.postCommentLike = postCommentLike;
        this.comment = comment;
    }
    async editPostCommentLike(editPostCommentLikeInput, user) {
        try {
            const { commentId } = editPostCommentLikeInput;
            const comment = await this.comment.findOne({
                where: {
                    id: commentId,
                },
            });
            if (!comment) {
                return {
                    ok: false,
                    error: '존재하지 않는 댓글입니다.',
                };
            }
            const prevLike = await this.postCommentLike.findOne({
                where: {
                    user: {
                        id: user.id,
                    },
                    comment: {
                        id: commentId,
                    },
                },
            });
            if (prevLike) {
                await this.postCommentLike.delete({ id: prevLike.id });
                return {
                    ok: true,
                    currentState: false,
                };
            }
            const newLike = this.postCommentLike.create({
                user,
                comment,
            });
            await this.postCommentLike.save(newLike);
            return {
                ok: true,
                currentState: true,
            };
        }
        catch (e) {
            console.log(e);
            return {
                ok: false,
                error: '좋아요 요청에 실패했습니다.',
            };
        }
    }
};
PostCommentLikeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(postCommentLike_entity_1.PostCommentLike)),
    __param(1, (0, typeorm_1.InjectRepository)(postComment_entity_1.PostComment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PostCommentLikeService);
exports.PostCommentLikeService = PostCommentLikeService;
//# sourceMappingURL=postCommentLike.service.js.map