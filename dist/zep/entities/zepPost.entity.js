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
exports.ZepPost = exports.ZepPostCategory = void 0;
const graphql_1 = require("@nestjs/graphql");
const core_entity_1 = require("../../common/entities/core.entity");
const typeorm_1 = require("typeorm");
const zepUser_entity_1 = require("./zepUser.entity");
const class_validator_1 = require("class-validator");
const zepComment_entity_1 = require("./zepComment.entity");
var ZepPostCategory;
(function (ZepPostCategory) {
    ZepPostCategory["FREE"] = "FREE";
    ZepPostCategory["STUDY"] = "STUDY";
    ZepPostCategory["NOTICE"] = "NOTICE";
    ZepPostCategory["FEEDBACK"] = "FEEDBACK";
    ZepPostCategory["ALGORISM"] = "ALGORISM";
    ZepPostCategory["PROJECT"] = "PROJECT";
})(ZepPostCategory = exports.ZepPostCategory || (exports.ZepPostCategory = {}));
(0, graphql_1.registerEnumType)(ZepPostCategory, { name: 'ZepPostCategory' });
let ZepPost = class ZepPost extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ZepPost.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ZepPost.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => zepUser_entity_1.ZepUser, (zepUser) => zepUser.zepPost, {
        onDelete: 'CASCADE',
    }),
    (0, graphql_1.Field)(() => zepUser_entity_1.ZepUser),
    __metadata("design:type", zepUser_entity_1.ZepUser)
], ZepPost.prototype, "zepUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => zepComment_entity_1.ZepComment, (zepComment) => zepComment.zepPost),
    (0, graphql_1.Field)(() => [zepComment_entity_1.ZepComment]),
    __metadata("design:type", Array)
], ZepPost.prototype, "zepComment", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ZepPostCategory,
        default: ZepPostCategory.FREE,
    }),
    (0, graphql_1.Field)(() => ZepPostCategory),
    (0, class_validator_1.IsEnum)(ZepPostCategory),
    __metadata("design:type", String)
], ZepPost.prototype, "category", void 0);
ZepPost = __decorate([
    (0, graphql_1.InputType)('ZepPostInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], ZepPost);
exports.ZepPost = ZepPost;
//# sourceMappingURL=zepPost.entity.js.map