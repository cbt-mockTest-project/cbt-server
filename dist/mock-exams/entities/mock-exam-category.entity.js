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
exports.MockExamCategory = void 0;
const mock_exam_entity_1 = require("./mock-exam.entity");
const core_entity_1 = require("../../common/entities/core.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
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
MockExamCategory = __decorate([
    (0, graphql_1.InputType)('MockExamCategoryInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], MockExamCategory);
exports.MockExamCategory = MockExamCategory;
//# sourceMappingURL=mock-exam-category.entity.js.map