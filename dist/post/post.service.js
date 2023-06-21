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
exports.PostService = void 0;
const revalidate_service_1 = require("./../revalidate/revalidate.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./entities/post.entity");
let PostService = class PostService {
    constructor(post, revalidateService) {
        this.post = post;
        this.revalidateService = revalidateService;
    }
    async createPost(createPostInput, user) {
        try {
            const { content, title, category } = createPostInput;
            if (content && title && user) {
                const post = this.post.create({ content, title, user, category });
                await this.post.save(post);
                await this.revalidateService.revalidate({
                    path: `/post/${post.id}`,
                });
            }
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '게시글 작성에 실패했습니다.',
            };
        }
    }
    async editPost(editPostInput, user) {
        try {
            const { title, content, id } = editPostInput;
            const prevPost = await this.post.findOne({
                where: { id, user: { id: user.id } },
            });
            if (!prevPost) {
                return {
                    ok: false,
                    error: '존재하지 않는 게시글입니다.',
                };
            }
            const savedPost = await this.post.save({
                title: title,
                content: content,
                id,
            });
            await this.revalidateService.revalidate({
                path: `/post/${savedPost.id}`,
            });
            return { ok: true, title: savedPost.title, content: savedPost.content };
        }
        catch (e) {
            console.log(e);
            return {
                ok: false,
                error: '게시글 수정에 실패했습니다.',
            };
        }
    }
    async deletePost(deletePostInput, user) {
        try {
            const { id } = deletePostInput;
            const post = await this.post.findOne({
                where: { id, user: { id: user.id } },
            });
            if (!post) {
                return {
                    ok: false,
                    error: '존재하지 않는 게시글입니다.',
                };
            }
            await this.post.delete({ id });
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '게시글 삭제에 실패했습니다.',
            };
        }
    }
    async readPost(readPostInput, user) {
        try {
            const { id } = readPostInput;
            let post = await this.post.findOne({
                where: { id },
                relations: {
                    user: true,
                    like: { user: true },
                    comment: { user: true, commentLike: { user: true } },
                },
            });
            if (!post) {
                return {
                    ok: false,
                    error: '존재하지 않는 게시글 입니다.',
                };
            }
            post.commentsCount = post.comment.length;
            post.likesCount = post.like.length;
            post.comment = post.comment.map((el) => {
                const newComment = Object.assign(Object.assign({}, el), { likesCount: el.commentLike.length });
                return newComment;
            });
            if (user) {
                post.likeState =
                    post.like.filter((el) => el.user.id === user.id).length >= 1;
            }
            post.comment = post.comment.sort((a, b) => Number(b.created_at) - Number(a.created_at));
            return {
                ok: true,
                post,
            };
        }
        catch (e) {
            console.log(e);
            return {
                ok: false,
                error: '게시글을 불러오지 못했습니다.',
            };
        }
    }
    async readPosts(readPostsInput) {
        try {
            const { page, limit, category, all, search } = readPostsInput;
            const skip = (page - 1) * limit;
            let options = {
                relations: { user: true, like: true, comment: true },
            };
            if (!all) {
                options = {
                    skip,
                    take: limit,
                    order: { priority: 'DESC', created_at: 'DESC' },
                    relations: { user: true, like: true, comment: true },
                    where: {
                        category,
                        title: search ? (0, typeorm_2.Like)(`%${search}%`) : undefined,
                        isHidden: false,
                    },
                };
            }
            let [posts, count] = await this.post.findAndCount(options);
            posts = posts.map((post) => {
                return post;
            });
            if (!all) {
                posts = posts.map((post) => {
                    return Object.assign(Object.assign({}, post), { likesCount: post.like.length, commentsCount: post.comment.length });
                });
            }
            return {
                posts,
                count,
                ok: true,
            };
        }
        catch (e) {
            console.log(e);
            return {
                ok: false,
                error: '게시글들을 불러오지 못했습니다.',
            };
        }
    }
    async viewPost(viewPostInput) {
        try {
            const { postId } = viewPostInput;
            const post = await this.post.findOne({ where: { id: postId } });
            if (!post) {
                return {
                    ok: false,
                    error: '존재하지 않는 게시글입니다.',
                };
            }
            const updatedPost = this.post.create(Object.assign(Object.assign({}, post), { view: post.view + 1 }));
            this.post.save(updatedPost);
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '죄회수를 올릴 수 없습니다.',
            };
        }
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        revalidate_service_1.RevalidateService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map