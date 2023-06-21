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
exports.MockExam = exports.ExamStatus = void 0;
const exam_co_author_entity_1 = require("./../../exam-co-author/entities/exam-co-author.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const mock_exam_category_entity_1 = require("./mock-exam-category.entity");
const core_entity_1 = require("./../../common/entities/core.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const mock_exam_question_entity_1 = require("./mock-exam-question.entity");
const mock_exam_question_state_entity_1 = require("./mock-exam-question-state.entity");
const class_validator_1 = require("class-validator");
const mock_exam_history_1 = require("./mock-exam-history");
var ExamStatus;
(function (ExamStatus) {
    ExamStatus["UNSET"] = "UNSET";
    ExamStatus["REQUEST"] = "REQUEST";
    ExamStatus["APPROVED"] = "APPROVED";
    ExamStatus["REJECTED"] = "REJECTED";
})(ExamStatus = exports.ExamStatus || (exports.ExamStatus = {}));
(0, graphql_1.registerEnumType)(ExamStatus, { name: 'ExamStatus' });
let MockExam = class MockExam extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], MockExam.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], MockExam.prototype, "slug", void 0);
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
__decorate([
    (0, graphql_1.Field)(() => [mock_exam_history_1.MockExamHistory]),
    (0, typeorm_1.OneToMany)(() => mock_exam_history_1.MockExamHistory, (MockExamHistory) => MockExamHistory.exam, {
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", Array)
], MockExam.prototype, "history", void 0);
__decorate([
    (0, graphql_1.Field)(() => [exam_co_author_entity_1.ExamCoAuthor], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => exam_co_author_entity_1.ExamCoAuthor, (examCoAuthor) => examCoAuthor.exam, {
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", Array)
], MockExam.prototype, "examCoAuthor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.mockExam, {
        onDelete: 'SET NULL',
    }),
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], MockExam.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ExamStatus, default: ExamStatus.UNSET }),
    (0, graphql_1.Field)(() => ExamStatus),
    (0, class_validator_1.IsEnum)(ExamStatus),
    __metadata("design:type", String)
], MockExam.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    (0, graphql_1.Field)(() => Number, { defaultValue: 0 }),
    __metadata("design:type", Number)
], MockExam.prototype, "order", void 0);
MockExam = __decorate([
    (0, graphql_1.InputType)('MockExamInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], MockExam);
exports.MockExam = MockExam;
//# sourceMappingURL=mock-exam.entity.js.map