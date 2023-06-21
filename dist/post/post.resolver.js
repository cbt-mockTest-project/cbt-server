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
exports.PostResolver = void 0;
const viewPost_dto_1 = require("./dtos/viewPost.dto");
const readPost_dto_1 = require("./dtos/readPost.dto");
const role_decorators_1 = require("./../auth/role.decorators");
const user_entity_1 = require("../users/entities/user.entity");
const post_entity_1 = require("./entities/post.entity");
const graphql_1 = require("@nestjs/graphql");
const post_service_1 = require("./post.service");
const createPost_dto_1 = require("./dtos/createPost.dto");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const editPost_dto_1 = require("./dtos/editPost.dto");
const deletePost_dto_1 = require("./dtos/deletePost.dto");
const readPosts_dto_1 = require("./dtos/readPosts.dto");
let PostResolver = class PostResolver {
    constructor(postService) {
        this.postService = postService;
    }
    async createPost(createPostInput, user) {
        return this.postService.createPost(createPostInput, user);
    }
    async editPost(editPostInput, user) {
        return this.postService.editPost(editPostInput, user);
    }
    async deletePost(deletePostInput, user) {
        return this.postService.deletePost(deletePostInput, user);
    }
    async viewPost(viewPostInput) {
        return this.postService.viewPost(viewPostInput);
    }
    async readPost(readPostInput, user) {
        return this.postService.readPost(readPostInput, user);
    }
    async readPosts(readPostsInput) {
        return this.postService.readPosts(readPostsInput);
    }
};
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => createPost_dto_1.CreatePostOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createPost_dto_1.CreatePostInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => editPost_dto_1.EditPostOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [editPost_dto_1.EditPostInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "editPost", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => deletePost_dto_1.DeletePostOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deletePost_dto_1.DeletePostInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
__decorate([
    (0, graphql_1.Mutation)(() => viewPost_dto_1.ViewPostOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [viewPost_dto_1.ViewPostInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "viewPost", null);
__decorate([
    (0, graphql_1.Query)(() => readPost_dto_1.ReadPostOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [readPost_dto_1.ReadPostInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "readPost", null);
__decorate([
    (0, graphql_1.Query)(() => readPosts_dto_1.ReadPostsOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [readPosts_dto_1.ReadPostsInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "readPosts", null);
PostResolver = __decorate([
    (0, graphql_1.Resolver)(() => post_entity_1.Post),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=post.resolver.js.map