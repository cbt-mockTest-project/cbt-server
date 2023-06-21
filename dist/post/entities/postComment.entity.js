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
exports.PostComment = void 0;
const post_entity_1 = require("./post.entity");
const core_entity_1 = require("../../common/entities/core.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const postCommentLike_entity_1 = require("./postCommentLike.entity");
let PostComment = class PostComment extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PostComment.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_entity_1.Post, (post) => post.comment, { onDelete: 'CASCADE' }),
    (0, graphql_1.Field)(() => post_entity_1.Post),
    __metadata("design:type", post_entity_1.Post)
], PostComment.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.postComment, {
        onDelete: 'CASCADE',
    }),
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], PostComment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => postCommentLike_entity_1.PostCommentLike, (postCommentLike) => postCommentLike.comment),
    (0, graphql_1.Field)(() => [postCommentLike_entity_1.PostCommentLike]),
    __metadata("design:type", Array)
], PostComment.prototype, "commentLike", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { defaultValue: false }),
    __metadata("design:type", Boolean)
], PostComment.prototype, "likeState", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { defaultValue: 0 }),
    __metadata("design:type", Number)
], PostComment.prototype, "likesCount", void 0);
PostComment = __decorate([
    (0, graphql_1.InputType)('PostCommentInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], PostComment);
exports.PostComment = PostComment;
//# sourceMappingURL=postComment.entity.js.map