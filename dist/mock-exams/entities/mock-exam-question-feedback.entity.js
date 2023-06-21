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
exports.MockExamQuestionFeedback = exports.MyRecommedationStatus = exports.RecommendationCount = exports.QuestionFeedbackType = void 0;
const user_entity_1 = require("../../users/entities/user.entity");
const mock_exam_question_entity_1 = require("./mock-exam-question.entity");
const core_entity_1 = require("./../../common/entities/core.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const mock_exam_question_feedback_recommendation_entity_1 = require("./mock-exam-question-feedback-recommendation.entity");
var QuestionFeedbackType;
(function (QuestionFeedbackType) {
    QuestionFeedbackType["PUBLIC"] = "PUBLIC";
    QuestionFeedbackType["PRIVATE"] = "PRIVATE";
    QuestionFeedbackType["REPORT"] = "REPORT";
})(QuestionFeedbackType = exports.QuestionFeedbackType || (exports.QuestionFeedbackType = {}));
let RecommendationCount = class RecommendationCount {
};
__decorate([
    (0, graphql_1.Field)(() => Number, { defaultValue: 0 }),
    __metadata("design:type", Number)
], RecommendationCount.prototype, "good", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { defaultValue: 0 }),
    __metadata("design:type", Number)
], RecommendationCount.prototype, "bad", void 0);
RecommendationCount = __decorate([
    (0, graphql_1.ObjectType)()
], RecommendationCount);
exports.RecommendationCount = RecommendationCount;
let MyRecommedationStatus = class MyRecommedationStatus {
};
__decorate([
    (0, graphql_1.Field)(() => Boolean, { defaultValue: false }),
    __metadata("design:type", Boolean)
], MyRecommedationStatus.prototype, "isGood", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { defaultValue: false }),
    __metadata("design:type", Boolean)
], MyRecommedationStatus.prototype, "isBad", void 0);
MyRecommedationStatus = __decorate([
    (0, graphql_1.ObjectType)()
], MyRecommedationStatus);
exports.MyRecommedationStatus = MyRecommedationStatus;
(0, graphql_1.registerEnumType)(QuestionFeedbackType, { name: 'QuestionFeedbackType' });
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
__decorate([
    (0, typeorm_1.OneToMany)(() => mock_exam_question_feedback_recommendation_entity_1.MockExamQuestionFeedbackRecommendation, (feedbackRecommendation) => feedbackRecommendation.feedback),
    (0, graphql_1.Field)(() => [mock_exam_question_feedback_recommendation_entity_1.MockExamQuestionFeedbackRecommendation]),
    __metadata("design:type", Array)
], MockExamQuestionFeedback.prototype, "recommendation", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: QuestionFeedbackType,
        default: QuestionFeedbackType.PUBLIC,
    }),
    (0, graphql_1.Field)(() => QuestionFeedbackType),
    (0, class_validator_1.IsEnum)(QuestionFeedbackType),
    __metadata("design:type", String)
], MockExamQuestionFeedback.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => RecommendationCount),
    __metadata("design:type", RecommendationCount)
], MockExamQuestionFeedback.prototype, "recommendationCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => MyRecommedationStatus),
    __metadata("design:type", MyRecommedationStatus)
], MockExamQuestionFeedback.prototype, "myRecommedationStatus", void 0);
MockExamQuestionFeedback = __decorate([
    (0, graphql_1.InputType)('MockExamQuestionFeedbackInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], MockExamQuestionFeedback);
exports.MockExamQuestionFeedback = MockExamQuestionFeedback;
//# sourceMappingURL=mock-exam-question-feedback.entity.js.map