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
exports.PostLikeService = void 0;
const post_entity_1 = require("./entities/post.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const postLike_entity_1 = require("./entities/postLike.entity");
let PostLikeService = class PostLikeService {
    constructor(postLike, post) {
        this.postLike = postLike;
        this.post = post;
    }
    async editPostLike(editPostLikeInput, user) {
        try {
            const { postId } = editPostLikeInput;
            const post = await this.post.findOne({
                where: {
                    id: postId,
                },
            });
            if (!post) {
                return {
                    ok: false,
                    error: '존재하지 않는 댓글입니다.',
                };
            }
            const prevLike = await this.postLike.findOne({
                where: {
                    user: {
                        id: user.id,
                    },
                    post: {
                        id: postId,
                    },
                },
            });
            if (prevLike) {
                await this.postLike.delete({ id: prevLike.id });
                return {
                    ok: true,
                    currentState: false,
                };
            }
            const newLike = this.postLike.create({
                user,
                post,
            });
            await this.postLike.save(newLike);
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
PostLikeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(postLike_entity_1.PostLike)),
    __param(1, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PostLikeService);
exports.PostLikeService = PostLikeService;
//# sourceMappingURL=postLike.service.js.map