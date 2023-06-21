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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.PostCategory = void 0;
const postComment_entity_1 = require("./postComment.entity");
const user_entity_1 = require("./../../users/entities/user.entity");
const graphql_1 = require("@nestjs/graphql");
const core_entity_1 = require("../../common/entities/core.entity");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const postLike_entity_1 = require("./postLike.entity");
var PostCategory;
(function (PostCategory) {
    PostCategory["FREE"] = "FREE";
    PostCategory["REVIEW"] = "REVIEW";
    PostCategory["RECOVERY"] = "RECOVERY";
    PostCategory["NOTICE"] = "NOTICE";
    PostCategory["CHECKIN"] = "CHECKIN";
    PostCategory["SUGGENSTION"] = "SUGGENSTION";
})(PostCategory = exports.PostCategory || (exports.PostCategory = {}));
(0, graphql_1.registerEnumType)(PostCategory, { name: 'PostCategory' });
let Post = class Post extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PostCategory,
        default: PostCategory.FREE,
    }),
    (0, graphql_1.Field)(() => PostCategory),
    (0, class_validator_1.IsEnum)(PostCategory),
    __metadata("design:type", String)
], Post.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => postComment_entity_1.PostComment, (postComment) => postComment.post),
    (0, graphql_1.Field)(() => [postComment_entity_1.PostComment]),
    __metadata("design:type", Array)
], Post.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => postLike_entity_1.PostLike, (postLike) => postLike.post),
    (0, graphql_1.Field)(() => [postLike_entity_1.PostLike]),
    __metadata("design:type", Array)
], Post.prototype, "like", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.post, {
        onDelete: 'CASCADE',
    }),
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Post.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    (0, graphql_1.Field)(() => Number, { defaultValue: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "view", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { defaultValue: false }),
    __metadata("design:type", Boolean)
], Post.prototype, "likeState", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    (0, graphql_1.Field)(() => Number, { defaultValue: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, graphql_1.Field)(() => Boolean, { defaultValue: false }),
    __metadata("design:type", Boolean)
], Post.prototype, "isHidden", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { defaultValue: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "likesCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { defaultValue: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "commentsCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { defaultValue: false }),
    __metadata("design:type", Boolean)
], Post.prototype, "commentLikeState", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { defaultValue: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "commentLikesCount", void 0);
Post = __decorate([
    (0, graphql_1.InputType)('PostInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=post.entity.js.map