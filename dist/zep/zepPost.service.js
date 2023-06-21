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
exports.ZepPostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const zepPost_entity_1 = require("./entities/zepPost.entity");
const typeorm_2 = require("typeorm");
const zepUser_entity_1 = require("./entities/zepUser.entity");
let ZepPostService = class ZepPostService {
    constructor(zepPost, zepUser) {
        this.zepPost = zepPost;
        this.zepUser = zepUser;
    }
    async createZepPost(createZepPostInput) {
        const { userId, title, content, category } = createZepPostInput;
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
            const post = this.zepPost.create({
                title,
                content,
                category,
                zepUser,
            });
            await this.zepPost.save(post);
            return {
                ok: true,
                post,
            };
        }
        catch (e) {
            return {
                ok: false,
                error: e.message,
            };
        }
    }
    async getZepPosts(getZepPostsInput) {
        const { category, limit, page } = getZepPostsInput;
        const skip = (Number(page) - 1) * Number(limit);
        try {
            const [posts, total] = await this.zepPost.findAndCount({
                where: { category },
                skip,
                take: Number(limit),
                order: { created_at: 'DESC' },
                relations: {
                    zepUser: true,
                    zepComment: {
                        zepUser: true,
                    },
                },
            });
            return {
                ok: true,
                posts,
                total,
            };
        }
        catch (e) {
            return {
                ok: false,
                error: e.message,
            };
        }
    }
    async getZepPost(postId) {
        try {
            const post = await this.zepPost.findOne({
                where: { id: Number(postId) },
                relations: {
                    zepUser: true,
                    zepComment: {
                        zepUser: true,
                    },
                },
            });
            if (!post) {
                return {
                    ok: false,
                    error: '존재하지 않는 게시글입니다.',
                };
            }
            return {
                ok: true,
                post,
            };
        }
        catch (e) {
            return {
                ok: false,
                error: e.message,
            };
        }
    }
    async updateZepPost(postId, updateZepPostInput) {
        const { title, content, category, userId } = updateZepPostInput;
        try {
            const post = await this.zepPost.findOne({
                where: { id: Number(postId) },
                relations: {
                    zepUser: true,
                },
            });
            if (!post) {
                return {
                    ok: false,
                    error: '존재하지 않는 게시글입니다.',
                };
            }
            if (post.zepUser.zep_id !== userId) {
                return {
                    ok: false,
                    error: '수정 권한이 없습니다.',
                };
            }
            if (title) {
                post.title = title;
            }
            if (content) {
                post.content = content;
            }
            if (category) {
                post.category = category;
            }
            await this.zepPost.save(post);
            return {
                ok: true,
                post,
            };
        }
        catch (e) {
            return {
                ok: false,
                error: e.message,
            };
        }
    }
    async deleteZepPost(postId, deleteZepPostInput) {
        try {
            const { userId } = deleteZepPostInput;
            const post = await this.zepPost.findOne({
                where: { id: Number(postId) },
                relations: {
                    zepUser: true,
                },
            });
            if (!post) {
                return {
                    ok: false,
                    error: '존재하지 않는 게시글입니다.',
                };
            }
            if (post.zepUser.zep_id !== userId) {
                return {
                    ok: false,
                    error: '삭제 권한이 없습니다.',
                };
            }
            await this.zepPost.delete(Number(postId));
            return {
                ok: true,
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
ZepPostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(zepPost_entity_1.ZepPost)),
    __param(1, (0, typeorm_1.InjectRepository)(zepUser_entity_1.ZepUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ZepPostService);
exports.ZepPostService = ZepPostService;
//# sourceMappingURL=zepPost.service.js.map