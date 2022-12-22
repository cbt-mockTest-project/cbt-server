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
exports.MockExamQuestionFeedback = void 0;
const user_entity_1 = require("../../users/entities/user.entity");
const mock_exam_question_entity_1 = require("./mock-exam-question.entity");
const core_entity_1 = require("./../../common/entities/core.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
let MockExamQuestionFeedback = class MockExamQuestionFeedback extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], MockExamQuestionFeedback.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mock_exam_question_entity_1.MockExamQuestion, (mockExamQuestion) => mockExamQuestion.mockExamQuestionFeedback, {
        onDelete: 'CASCADE',
    }),
    (0, graphql_1.Field)(() => mock_exam_question_entity_1.MockExamQuestion),
    __metadata("design:type", mock_exam_question_entity_1.MockExamQuestion)
], MockExamQuestionFeedback.prototype, "mockExamQuestion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.questionFeedback, {
        onDelete: 'CASCADE',
    }),
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], MockExamQuestionFeedback.prototype, "user", void 0);
MockExamQuestionFeedback = __decorate([
    (0, graphql_1.InputType)('MockExamQuestionFeedbackInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], MockExamQuestionFeedback);
exports.MockExamQuestionFeedback = MockExamQuestionFeedback;
//# sourceMappingURL=mock-exam-question-feedback.entity.js.map