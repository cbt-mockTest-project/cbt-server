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
exports.ZepStudyTime = void 0;
const graphql_1 = require("@nestjs/graphql");
const core_entity_1 = require("../../common/entities/core.entity");
const typeorm_1 = require("typeorm");
const zepUser_entity_1 = require("./zepUser.entity");
let ZepStudyTime = class ZepStudyTime extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], ZepStudyTime.prototype, "grass_count", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], ZepStudyTime.prototype, "study_time", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ZepStudyTime.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => zepUser_entity_1.ZepUser, (zepUser) => zepUser.studyTimes, {
        onDelete: 'CASCADE',
    }),
    (0, graphql_1.Field)(() => zepUser_entity_1.ZepUser),
    __metadata("design:type", zepUser_entity_1.ZepUser)
], ZepStudyTime.prototype, "zepUser", void 0);
ZepStudyTime = __decorate([
    (0, graphql_1.InputType)('ZepStudyTimeInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], ZepStudyTime);
exports.ZepStudyTime = ZepStudyTime;
//# sourceMappingURL=zepStudyTime.entity.js.map