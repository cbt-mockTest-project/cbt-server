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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockExamQuestionFeedbackRecommendationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const mock_exam_question_feedback_recommendation_entity_1 = require("./entities/mock-exam-question-feedback-recommendation.entity");
const mock_exams_question_feedback_recommendation_service_1 = require("./mock-exams-question-feedback-recommendation.service");
const updateMockExamQuestionFeedbackRecommendation_dto_1 = require("./dtos/updateMockExamQuestionFeedbackRecommendation.dto");
const user_entity_1 = require("../users/entities/user.entity");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const role_decorators_1 = require("../auth/role.decorators");
const getFeedbacksByRecommendationCount_dto_1 = require("./dtos/getFeedbacksByRecommendationCount.dto");
let MockExamQuestionFeedbackRecommendationResolver = class MockExamQuestionFeedbackRecommendationResolver {
    constructor(mockExamQuestionFeedbackRecommendationService) {
        this.mockExamQuestionFeedbackRecommendationService = mockExamQuestionFeedbackRecommendationService;
    }
    async updateMockExamQuestionFeedbackRecommendation(updateMockExamQuestionFeedbackRecommendationInput, user) {
        return this.mockExamQuestionFeedbackRecommendationService.updateMockExamQuestionFeedbackRecommendation(updateMockExamQuestionFeedbackRecommendationInput, user);
    }
    async getFeedbacksByRecommendationCount(getFeedbacksByRecommendationCountInput) {
        return this.mockExamQuestionFeedbackRecommendationService.getFeedbacksByRecommendationCount(getFeedbacksByRecommendationCountInput);
    }
};
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => updateMockExamQuestionFeedbackRecommendation_dto_1.UpdateMockExamQuestionFeedbackRecommendationOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateMockExamQuestionFeedbackRecommendation_dto_1.UpdateMockExamQuestionFeedbackRecommendationInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MockExamQuestionFeedbackRecommendationResolver.prototype, "updateMockExamQuestionFeedbackRecommendation", null);
__decorate([
    (0, graphql_1.Query)(() => getFeedbacksByRecommendationCount_dto_1.GetFeedbacksByRecommendationCountOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getFeedbacksByRecommendationCount_dto_1.GetFeedbacksByRecommendationCountInput]),
    __metadata("design:returntype", Promise)
], MockExamQuestionFeedbackRecommendationResolver.prototype, "getFeedbacksByRecommendationCount", null);
MockExamQuestionFeedbackRecommendationResolver = __decorate([
    (0, graphql_1.Resolver)(() => mock_exam_question_feedback_recommendation_entity_1.MockExamQuestionFeedbackRecommendation),
    __metadata("design:paramtypes", [mock_exams_question_feedback_recommendation_service_1.MockExamQuestionFeedbackRecommendationService])
], MockExamQuestionFeedbackRecommendationResolver);
exports.MockExamQuestionFeedbackRecommendationResolver = MockExamQuestionFeedbackRecommendationResolver;
//# sourceMappingURL=mock-exams-question-feedback-recommendation.resolver.js.map