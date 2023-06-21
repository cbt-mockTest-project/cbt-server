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
exports.UpdateMockExamQuestionFeedbackRecommendationOutput = exports.UpdateMockExamQuestionFeedbackRecommendationInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const mock_exam_question_feedback_recommendation_entity_1 = require("../entities/mock-exam-question-feedback-recommendation.entity");
const output_dto_1 = require("../../common/dtos/output.dto");
let UpdateMockExamQuestionFeedbackRecommendationInput = class UpdateMockExamQuestionFeedbackRecommendationInput extends (0, graphql_1.PickType)(mock_exam_question_feedback_recommendation_entity_1.MockExamQuestionFeedbackRecommendation, ['type']) {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], UpdateMockExamQuestionFeedbackRecommendationInput.prototype, "feedbackId", void 0);
UpdateMockExamQuestionFeedbackRecommendationInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateMockExamQuestionFeedbackRecommendationInput);
exports.UpdateMockExamQuestionFeedbackRecommendationInput = UpdateMockExamQuestionFeedbackRecommendationInput;
let UpdateMockExamQuestionFeedbackRecommendationOutput = class UpdateMockExamQuestionFeedbackRecommendationOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => mock_exam_question_feedback_recommendation_entity_1.MockExamQuestionFeedbackRecommendation, { nullable: true }),
    __metadata("design:type", mock_exam_question_feedback_recommendation_entity_1.MockExamQuestionFeedbackRecommendation)
], UpdateMockExamQuestionFeedbackRecommendationOutput.prototype, "recommendation", void 0);
UpdateMockExamQuestionFeedbackRecommendationOutput = __decorate([
    (0, graphql_1.ObjectType)()
], UpdateMockExamQuestionFeedbackRecommendationOutput);
exports.UpdateMockExamQuestionFeedbackRecommendationOutput = UpdateMockExamQuestionFeedbackRecommendationOutput;
//# sourceMappingURL=updateMockExamQuestionFeedbackRecommendation.dto.js.map