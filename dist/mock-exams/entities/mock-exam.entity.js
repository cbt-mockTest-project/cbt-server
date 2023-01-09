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
exports.MockExam = void 0;
const mock_exam_category_entity_1 = require("./mock-exam-category.entity");
const core_entity_1 = require("./../../common/entities/core.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const mock_exam_question_entity_1 = require("./mock-exam-question.entity");
const mock_exam_question_state_entity_1 = require("./mock-exam-question-state.entity");
let MockExam = class MockExam extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], MockExam.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => Boolean, { defaultValue: false }),
    __metadata("design:type", Boolean)
], MockExam.prototype, "approved", void 0);
__decorate([
    (0, graphql_1.Field)(() => mock_exam_category_entity_1.MockExamCategory),
    (0, typeorm_1.ManyToOne)(() => mock_exam_category_entity_1.MockExamCategory, (mockExamCategory) => mockExamCategory.mockExam, {
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", mock_exam_category_entity_1.MockExamCategory)
], MockExam.prototype, "mockExamCategory", void 0);
__decorate([
    (0, graphql_1.Field)(() => [mock_exam_question_entity_1.MockExamQuestion]),
    (0, typeorm_1.OneToMany)(() => mock_exam_question_entity_1.MockExamQuestion, (mockExamQuestion) => mockExamQuestion.mockExam, {
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", Array)
], MockExam.prototype, "mockExamQuestion", void 0);
__decorate([
    (0, graphql_1.Field)(() => [mock_exam_question_entity_1.MockExamQuestion]),
    (0, typeorm_1.OneToMany)(() => mock_exam_question_state_entity_1.MockExamQuestionState, (mockExamQuestionState) => mockExamQuestionState.exam, {
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", Array)
], MockExam.prototype, "mockExamQuestionState", void 0);
MockExam = __decorate([
    (0, graphql_1.InputType)('MockExamInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], MockExam);
exports.MockExam = MockExam;
//# sourceMappingURL=mock-exam.entity.js.map