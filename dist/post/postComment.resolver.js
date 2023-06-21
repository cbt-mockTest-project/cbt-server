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
exports.PostCommentResolver = void 0;
const common_constants_1 = require("../common/common.constants");
const postComment_entity_1 = require("./entities/postComment.entity");
const user_entity_1 = require("../users/entities/user.entity");
const deletePostComment_dto_1 = require("./dtos/deletePostComment.dto");
const graphql_1 = require("@nestjs/graphql");
const role_decorators_1 = require("../auth/role.decorators");
const createPostComment_dto_1 = require("./dtos/createPostComment.dto");
const editPostComment_dto_1 = require("./dtos/editPostComment.dto");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const postComment_service_1 = require("./postComment.service");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const common_1 = require("@nestjs/common");
let PostCommentResolver = class PostCommentResolver {
    constructor(postCommentSerivce, pubSub) {
        this.postCommentSerivce = postCommentSerivce;
        this.pubSub = pubSub;
    }
    createPostComment(createPostCommentInput, user) {
        return this.postCommentSerivce.createPostComment(createPostCommentInput, user);
    }
    async editPostComment(editPostCommentInput, user) {
        return this.postCommentSerivce.editPostComment(editPostCommentInput, user);
    }
    async deletePostComment(deletePostCommentInput, user) {
        return this.postCommentSerivce.deletePostComment(deletePostCommentInput, user);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => createPostComment_dto_1.CreatePostCommentOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createPostComment_dto_1.CreatePostCommentInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PostCommentResolver.prototype, "createPostComment", null);
__decorate([
    (0, graphql_1.Mutation)(() => editPostComment_dto_1.EditPostCommentOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [editPostComment_dto_1.EditPostCommentInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PostCommentResolver.prototype, "editPostComment", null);
__decorate([
    (0, graphql_1.Mutation)(() => deletePostComment_dto_1.DeletePostCommentOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deletePostComment_dto_1.DeletePostCommentInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PostCommentResolver.prototype, "deletePostComment", null);
PostCommentResolver = __decorate([
    (0, graphql_1.Resolver)(() => postComment_entity_1.PostComment),
    __param(1, (0, common_1.Inject)(common_constants_1.PUB_SUB)),
    __metadata("design:paramtypes", [postComment_service_1.PostCommentSerivce,
        graphql_subscriptions_1.PubSub])
], PostCommentResolver);
exports.PostCommentResolver = PostCommentResolver;
//# sourceMappingURL=postComment.resolver.js.map