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
exports.ZepUser = void 0;
const graphql_1 = require("@nestjs/graphql");
const core_entity_1 = require("../../common/entities/core.entity");
const typeorm_1 = require("typeorm");
const zepStudyTime_entity_1 = require("./zepStudyTime.entity");
const zepPost_entity_1 = require("./zepPost.entity");
const zepComment_entity_1 = require("./zepComment.entity");
let ZepUser = class ZepUser extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ZepUser.prototype, "zep_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ZepUser.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => zepStudyTime_entity_1.ZepStudyTime, (zepStudyTime) => zepStudyTime.zepUser),
    (0, graphql_1.Field)(() => [zepStudyTime_entity_1.ZepStudyTime]),
    __metadata("design:type", Array)
], ZepUser.prototype, "studyTimes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => zepPost_entity_1.ZepPost, (zepPost) => zepPost.zepUser),
    (0, graphql_1.Field)(() => [zepPost_entity_1.ZepPost]),
    __metadata("design:type", Array)
], ZepUser.prototype, "zepPost", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => zepComment_entity_1.ZepComment, (zepComment) => zepComment.zepUser),
    (0, graphql_1.Field)(() => [zepComment_entity_1.ZepComment]),
    __metadata("design:type", Array)
], ZepUser.prototype, "zepComment", void 0);
ZepUser = __decorate([
    (0, graphql_1.InputType)('ZepUserInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], ZepUser);
exports.ZepUser = ZepUser;
//# sourceMappingURL=zepUser.entity.js.map