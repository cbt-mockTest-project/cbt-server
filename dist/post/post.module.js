"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const user_module_1 = require("../users/user.module");
const postCommentLike_service_1 = require("./postCommentLike.service");
const postComment_resolver_1 = require("./postComment.resolver");
const postComment_service_1 = require("./postComment.service");
const postLike_service_1 = require("./postLike.service");
const postLike_resolver_1 = require("./postLike.resolver");
const postLike_entity_1 = require("./entities/postLike.entity");
const postComment_entity_1 = require("./entities/postComment.entity");
const typeorm_1 = require("@nestjs/typeorm");
const post_entity_1 = require("./entities/post.entity");
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const post_resolver_1 = require("./post.resolver");
const postCommentLike_entity_1 = require("./entities/postCommentLike.entity");
const postCommentLike_resolver_1 = require("./postCommentLike.resolver");
const notice_entity_1 = require("../users/entities/notice.entity");
let PostModule = class PostModule {
};
PostModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                post_entity_1.Post,
                postComment_entity_1.PostComment,
                postCommentLike_entity_1.PostCommentLike,
                postLike_entity_1.PostLike,
                notice_entity_1.Notice,
            ]),
            user_module_1.UserModule,
        ],
        providers: [
            post_service_1.PostService,
            post_resolver_1.PostResolver,
            postLike_resolver_1.PostLikeResolver,
            postLike_service_1.PostLikeService,
            postComment_service_1.PostCommentSerivce,
            postComment_resolver_1.PostCommentResolver,
            postCommentLike_service_1.PostCommentLikeService,
            postCommentLike_resolver_1.PostCommentLikeResolver,
        ],
    })
], PostModule);
exports.PostModule = PostModule;
//# sourceMappingURL=post.module.js.map