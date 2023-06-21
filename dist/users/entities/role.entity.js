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
exports.Role = void 0;
const graphql_1 = require("@nestjs/graphql");
const core_entity_1 = require("../../common/entities/core.entity");
const typeorm_1 = require("typeorm");
const userAndRole_entity_1 = require("./userAndRole.entity");
const mock_exam_category_entity_1 = require("../../mock-exams/entities/mock-exam-category.entity");
let Role = class Role extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userAndRole_entity_1.UserAndRole, (userRole) => userRole.role),
    (0, graphql_1.Field)(() => [userAndRole_entity_1.UserAndRole]),
    __metadata("design:type", Array)
], Role.prototype, "userRoles", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => mock_exam_category_entity_1.MockExamCategory, (mockExamCategory) => mockExamCategory.roles),
    (0, graphql_1.Field)(() => [mock_exam_category_entity_1.MockExamCategory]),
    __metadata("design:type", Array)
], Role.prototype, "mockExamCategories", void 0);
Role = __decorate([
    (0, graphql_1.InputType)('RoleInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Role);
exports.Role = Role;
//# sourceMappingURL=role.entity.js.map