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
exports.MockExamQuestionFeedbackRecommendationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mock_exam_question_feedback_recommendation_entity_1 = require("./entities/mock-exam-question-feedback-recommendation.entity");
const mock_exam_question_feedback_entity_1 = require("./entities/mock-exam-question-feedback.entity");
const user_entity_1 = require("../users/entities/user.entity");
let MockExamQuestionFeedbackRecommendationService = class MockExamQuestionFeedbackRecommendationService {
    constructor(mockExamQuestionFeedbackRecommendation, mockExamQuestionFeedback, users) {
        this.mockExamQuestionFeedbackRecommendation = mockExamQuestionFeedbackRecommendation;
        this.mockExamQuestionFeedback = mockExamQuestionFeedback;
        this.users = users;
    }
    async updateMockExamQuestionFeedbackRecommendation(updateMockExamQuestionFeedbackRecommendationInput, user) {
        try {
            const { type, feedbackId } = updateMockExamQuestionFeedbackRecommendationInput;
            const feedback = await this.mockExamQuestionFeedback.findOne({
                where: { id: feedbackId },
            });
            if (!feedback) {
                return {
                    ok: false,
                    error: 'Feedback not found',
                };
            }
            const prevRecommendation = await this.mockExamQuestionFeedbackRecommendation.findOne({
                where: {
                    user: { id: user.id },
                    feedback: { id: feedbackId },
                },
            });
            if (!prevRecommendation) {
                const newRecommendation = await this.mockExamQuestionFeedbackRecommendation.save(this.mockExamQuestionFeedbackRecommendation.create({
                    user,
                    feedback,
                    type,
                }));
                return {
                    ok: true,
                    recommendation: newRecommendation,
                };
            }
            if (prevRecommendation.type === type) {
                await this.mockExamQuestionFeedbackRecommendation.delete({
                    id: prevRecommendation.id,
                });
                return {
                    ok: true,
                    recommendation: null,
                };
            }
            if (prevRecommendation.type !== type) {
                const newRecommendation = await this.mockExamQuestionFeedbackRecommendation.save({
                    id: prevRecommendation.id,
                    type,
                });
                return {
                    ok: true,
                    recommendation: newRecommendation,
                };
            }
            return {
                ok: false,
                error: 'Something went wrong',
            };
        }
        catch (e) {
            console.log(e);
            return {
                ok: false,
            };
        }
    }
    async getFeedbacksByRecommendationCount(getFeedbacksByRecommendationCountInput) {
        try {
            const { count } = getFeedbacksByRecommendationCountInput;
            const subQuery = this.mockExamQuestionFeedback
                .createQueryBuilder('subFeedback')
                .leftJoin('subFeedback.recommendation', 'subRecommendation')
                .select('subFeedback.id')
                .groupBy('subFeedback.id')
                .having(`COUNT(subRecommendation.id) >= ${count}`);
            const feedbacks = await this.mockExamQuestionFeedback
                .createQueryBuilder('feedback')
                .leftJoinAndSelect('feedback.recommendation', 'recommendation')
                .leftJoinAndSelect('feedback.mockExamQuestion', 'question')
                .where(`feedback.id IN (${subQuery.getQuery()})`)
                .setParameters(subQuery.getParameters())
                .getMany();
            return {
                ok: true,
                feedbacks,
            };
        }
        catch (e) {
            console.log(e);
        }
    }
};
MockExamQuestionFeedbackRecommendationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mock_exam_question_feedback_recommendation_entity_1.MockExamQuestionFeedbackRecommendation)),
    __param(1, (0, typeorm_1.InjectRepository)(mock_exam_question_feedback_entity_1.MockExamQuestionFeedback)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MockExamQuestionFeedbackRecommendationService);
exports.MockExamQuestionFeedbackRecommendationService = MockExamQuestionFeedbackRecommendationService;
//# sourceMappingURL=mock-exams-question-feedback-recommendation.service.js.map