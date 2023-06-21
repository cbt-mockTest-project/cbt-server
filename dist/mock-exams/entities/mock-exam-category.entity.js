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
exports.ExamCategoryRole = exports.MockExamCategory = exports.MockExamCategoryTypes = void 0;
const exam_co_author_entity_1 = require("./../../exam-co-author/entities/exam-co-author.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const mock_exam_entity_1 = require("./mock-exam.entity");
const core_entity_1 = require("../../common/entities/core.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const role_entity_1 = require("../../users/entities/role.entity");
const partners_entity_1 = require("../../partners/entities/partners.entity");
var MockExamCategoryTypes;
(function (MockExamCategoryTypes) {
    MockExamCategoryTypes["written"] = "written";
    MockExamCategoryTypes["practical"] = "practical";
})(MockExamCategoryTypes = exports.MockExamCategoryTypes || (exports.MockExamCategoryTypes = {}));
(0, graphql_1.registerEnumType)(MockExamCategoryTypes, { name: 'MockExamCategoryTypes' });
let MockExamCategory = class MockExamCategory extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], MockExamCategory.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => [mock_exam_entity_1.MockExam]),
    (0, typeorm_1.OneToMany)(() => mock_exam_entity_1.MockExam, (mockExam) => mockExam.mockExamCategory),
    __metadata("design:type", Array)
], MockExamCategory.prototype, "mockExam", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: MockExamCategoryTypes,
        default: MockExamCategoryTypes.practical,
    }),
    (0, graphql_1.Field)(() => MockExamCategoryTypes),
    (0, class_validator_1.IsEnum)(MockExamCategoryTypes),
    __metadata("design:type", String)
], MockExamCategory.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: true,
    }),
    (0, graphql_1.Field)(() => Boolean, { defaultValue: true }),
    __metadata("design:type", Boolean)
], MockExamCategory.prototype, "approved", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.mockExamCategory, {
        onDelete: 'SET NULL',
    }),
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], MockExamCategory.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => partners_entity_1.Partner, (partner) => partner.examCategory, {
        onDelete: 'SET NULL',
    }),
    (0, graphql_1.Field)(() => partners_entity_1.Partner, { nullable: true }),
    __metadata("design:type", partners_entity_1.Partner)
], MockExamCategory.prototype, "partner", void 0);
__decorate([
    (0, graphql_1.Field)(() => [exam_co_author_entity_1.ExamCoAuthor], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => exam_co_author_entity_1.ExamCoAuthor, (examCoAuthor) => examCoAuthor.examCategory, {
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", Array)
], MockExamCategory.prototype, "examCoAuthor", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => role_entity_1.Role, (role) => role.mockExamCategories),
    (0, typeorm_1.JoinTable)({ name: 'ExamCategoryRole' }),
    (0, graphql_1.Field)(() => [role_entity_1.Role]),
    __metadata("design:type", Array)
], MockExamCategory.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], MockExamCategory.prototype, "order", void 0);
MockExamCategory = __decorate([
    (0, graphql_1.InputType)('MockExamCategoryInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], MockExamCategory);
exports.MockExamCategory = MockExamCategory;
let ExamCategoryRole = class ExamCategoryRole extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.Role, (role) => role.mockExamCategories),
    __metadata("design:type", role_entity_1.Role)
], ExamCategoryRole.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => MockExamCategory, (category) => category.roles),
    __metadata("design:type", MockExamCategory)
], ExamCategoryRole.prototype, "mockExamCategory", void 0);
ExamCategoryRole = __decorate([
    (0, typeorm_1.Entity)()
], ExamCategoryRole);
exports.ExamCategoryRole = ExamCategoryRole;
//# sourceMappingURL=mock-exam-category.entity.js.map