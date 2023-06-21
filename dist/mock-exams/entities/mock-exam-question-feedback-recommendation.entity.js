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
exports.MockExamQuestionFeedbackRecommendation = exports.QuestionFeedbackRecommendationType = void 0;
const mock_exam_question_feedback_entity_1 = require("./mock-exam-question-feedback.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const core_entity_1 = require("../../common/entities/core.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
var QuestionFeedbackRecommendationType;
(function (QuestionFeedbackRecommendationType) {
    QuestionFeedbackRecommendationType["GOOD"] = "GOOD";
    QuestionFeedbackRecommendationType["BAD"] = "BAD";
})(QuestionFeedbackRecommendationType = exports.QuestionFeedbackRecommendationType || (exports.QuestionFeedbackRecommendationType = {}));
(0, graphql_1.registerEnumType)(QuestionFeedbackRecommendationType, {
    name: 'QuestionFeedbackRecommendationType',
});
let MockExamQuestionFeedbackRecommendation = class MockExamQuestionFeedbackRecommendation extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => mock_exam_question_feedback_entity_1.MockExamQuestionFeedback, (mockExamQuestionFeedback) => mockExamQuestionFeedback.recommendation, { onDelete: 'CASCADE' }),
    (0, graphql_1.Field)(() => mock_exam_question_feedback_entity_1.MockExamQuestionFeedback),
    __metadata("design:type", mock_exam_question_feedback_entity_1.MockExamQuestionFeedback)
], MockExamQuestionFeedbackRecommendation.prototype, "feedback", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.feedbackRecommendation),
    __metadata("design:type", user_entity_1.User)
], MockExamQuestionFeedbackRecommendation.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: QuestionFeedbackRecommendationType,
    }),
    (0, graphql_1.Field)(() => QuestionFeedbackRecommendationType),
    (0, class_validator_1.IsEnum)(QuestionFeedbackRecommendationType),
    __metadata("design:type", String)
], MockExamQuestionFeedbackRecommendation.prototype, "type", void 0);
MockExamQuestionFeedbackRecommendation = __decorate([
    (0, graphql_1.InputType)('MockExamQuestionFeedbackRecommendationInputType', {
        isAbstract: true,
    }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], MockExamQuestionFeedbackRecommendation);
exports.MockExamQuestionFeedbackRecommendation = MockExamQuestionFeedbackRecommendation;
//# sourceMappingURL=mock-exam-question-feedback-recommendation.entity.js.map