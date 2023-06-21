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
exports.ZepComment = void 0;
const graphql_1 = require("@nestjs/graphql");
const core_entity_1 = require("../../common/entities/core.entity");
const typeorm_1 = require("typeorm");
const zepPost_entity_1 = require("./zepPost.entity");
const zepUser_entity_1 = require("./zepUser.entity");
let ZepComment = class ZepComment extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ZepComment.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => zepPost_entity_1.ZepPost, (zepPost) => zepPost.zepComment, {
        onDelete: 'CASCADE',
    }),
    (0, graphql_1.Field)(() => zepPost_entity_1.ZepPost),
    __metadata("design:type", zepPost_entity_1.ZepPost)
], ZepComment.prototype, "zepPost", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => zepUser_entity_1.ZepUser, (zepUser) => zepUser.zepComment, {
        onDelete: 'CASCADE',
    }),
    (0, graphql_1.Field)(() => zepUser_entity_1.ZepUser),
    __metadata("design:type", zepUser_entity_1.ZepUser)
], ZepComment.prototype, "zepUser", void 0);
ZepComment = __decorate([
    (0, graphql_1.InputType)('ZepCommentInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], ZepComment);
exports.ZepComment = ZepComment;
//# sourceMappingURL=zepComment.entity.js.map