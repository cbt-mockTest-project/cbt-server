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
exports.MockExamQuestion = exports.MockExamVideoType = exports.MockExamImageType = void 0;
const mock_exam_entity_1 = require("./mock-exam.entity");
const core_entity_1 = require("../../common/entities/core.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const mock_exam_question_feedback_entity_1 = require("./mock-exam-question-feedback.entity");
const mock_exam_question_state_entity_1 = require("./mock-exam-question-state.entity");
const mock_exam_question_comment_entity_1 = require("./mock-exam-question-comment.entity");
const mock_exam_question_bookmark_entity_1 = require("./mock-exam-question-bookmark.entity");
const mock_exam_question_multiple_choice_entity_1 = require("./mock-exam-question-multiple-choice.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let MockExamImageType = class MockExamImageType {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], MockExamImageType.prototype, "url", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], MockExamImageType.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], MockExamImageType.prototype, "uid", void 0);
MockExamImageType = __decorate([
    (0, graphql_1.InputType)('MockExamQuestionImageInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)()
], MockExamImageType);
exports.MockExamImageType = MockExamImageType;
let MockExamVideoType = class MockExamVideoType {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], MockExamVideoType.prototype, "url", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], MockExamVideoType.prototype, "size", void 0);
MockExamVideoType = __decorate([
    (0, graphql_1.InputType)('MockExamQuestionVideoInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)()
], MockExamVideoType);
exports.MockExamVideoType = MockExamVideoType;
let MockExamQuestion = class MockExamQuestion extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], MockExamQuestion.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], MockExamQuestion.prototype, "solution", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], MockExamQuestion.prototype, "approved", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', default: [] }),
    (0, graphql_1.Field)(() => [MockExamVideoType], { nullable: true }),
    __metadata("design:type", Array)
], MockExamQuestion.prototype, "question_video", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', default: [] }),
    (0, graphql_1.Field)(() => [MockExamImageType], { nullable: true }),
    __metadata("design:type", Array)
], MockExamQuestion.prototype, "question_img", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', default: [] }),
    (0, graphql_1.Field)(() => [MockExamImageType], { nullable: true }),
    __metadata("design:type", Array)
], MockExamQuestion.prototype, "solution_img", void 0);
__decorate([
    (0, graphql_1.Field)(() => mock_exam_entity_1.MockExam, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => mock_exam_entity_1.MockExam, (mockExam) => mockExam.mockExamQuestion, {
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", mock_exam_entity_1.MockExam)
], MockExamQuestion.prototype, "mockExam", void 0);
__decorate([
    (0, typeorm_1.RelationId)((mockExamQusetion) => mockExamQusetion.mockExam),
    __metadata("design:type", Number)
], MockExamQuestion.prototype, "mockExamId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mock_exam_question_feedback_entity_1.MockExamQuestionFeedback, (mockExamQuestionFeedback) => mockExamQuestionFeedback.mockExamQuestion),
    (0, graphql_1.Field)(() => [mock_exam_question_feedback_entity_1.MockExamQuestionFeedback]),
    __metadata("design:type", Array)
], MockExamQuestion.prototype, "mockExamQuestionFeedback", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mock_exam_question_comment_entity_1.MockExamQuestionComment, (MockExamQuestionComment) => MockExamQuestionComment.question),
    (0, graphql_1.Field)(() => [mock_exam_question_comment_entity_1.MockExamQuestionComment]),
    __metadata("design:type", Array)
], MockExamQuestion.prototype, "mockExamQuestionComment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mock_exam_question_state_entity_1.MockExamQuestionState, (mockExamQuestionState) => mockExamQuestionState.question),
    (0, graphql_1.Field)(() => [mock_exam_question_state_entity_1.MockExamQuestionState]),
    __metadata("design:type", Array)
], MockExamQuestion.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToOne)(() => mock_exam_question_multiple_choice_entity_1.MockExamQuestionMultipleChoice, (multipleChoice) => multipleChoice.question, {
        onDelete: 'SET NULL',
    }),
    (0, graphql_1.Field)(() => [mock_exam_question_multiple_choice_entity_1.MockExamQuestionMultipleChoice]),
    __metadata("design:type", Array)
], MockExamQuestion.prototype, "multipleChoice", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], MockExamQuestion.prototype, "number", void 0);
__decorate([
    (0, graphql_1.Field)(() => [mock_exam_question_bookmark_entity_1.MockExamQuestionBookmark]),
    (0, typeorm_1.OneToMany)(() => mock_exam_question_bookmark_entity_1.MockExamQuestionBookmark, (mockExamQuestionBookmark) => mockExamQuestionBookmark.question, {
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", Array)
], MockExamQuestion.prototype, "mockExamQuestionBookmark", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.mockExamQuestion, {
        onDelete: 'SET NULL',
    }),
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], MockExamQuestion.prototype, "user", void 0);
MockExamQuestion = __decorate([
    (0, graphql_1.InputType)('MockExamQuestionInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], MockExamQuestion);
exports.MockExamQuestion = MockExamQuestion;
//# sourceMappingURL=mock-exam-question.entity.js.map