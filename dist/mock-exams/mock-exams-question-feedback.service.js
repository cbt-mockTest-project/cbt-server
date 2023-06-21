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
exports.MockExamQuestionFeedbackSerivce = void 0;
const user_entity_1 = require("../users/entities/user.entity");
const mock_exam_question_entity_1 = require("./entities/mock-exam-question.entity");
const mock_exam_question_feedback_entity_1 = require("./entities/mock-exam-question-feedback.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const utils_1 = require("../utils/utils");
const mock_exam_question_feedback_recommendation_entity_1 = require("./entities/mock-exam-question-feedback-recommendation.entity");
const exam_co_author_entity_1 = require("../exam-co-author/entities/exam-co-author.entity");
let MockExamQuestionFeedbackSerivce = class MockExamQuestionFeedbackSerivce {
    constructor(mockExamQuestionFeedback, mockExamQuestion, users, examCoAuthors) {
        this.mockExamQuestionFeedback = mockExamQuestionFeedback;
        this.mockExamQuestion = mockExamQuestion;
        this.users = users;
        this.examCoAuthors = examCoAuthors;
    }
    async createMockExamQuestionFeedback(createMockExamQuestionFeedbackInput, user) {
        try {
            const { questionId, content, type } = createMockExamQuestionFeedbackInput;
            const question = await this.mockExamQuestion.findOne({
                where: { id: questionId },
            });
            if (!question) {
                return {
                    ok: false,
                    error: '존재하지 않는 문제입니다.',
                };
            }
            let feedback = this.mockExamQuestionFeedback.create({
                content,
                type,
                mockExamQuestion: question,
                user,
            });
            feedback = await this.mockExamQuestionFeedback.save(feedback);
            feedback.recommendationCount = { bad: 0, good: 0 };
            feedback.myRecommedationStatus = { isBad: false, isGood: false };
            return {
                ok: true,
                feedback,
            };
        }
        catch (e) {
            console.log(e);
            return {
                ok: false,
                error: '피드백을 보낼 수 없습니다.',
            };
        }
    }
    async editMockExamQuestionFeedback(editMockExamQuestionFeedbackInput) {
        try {
            const { id, content } = editMockExamQuestionFeedbackInput;
            const prevFeedback = await this.mockExamQuestionFeedback.findOne({
                where: { id },
            });
            if (!prevFeedback) {
                return {
                    ok: false,
                    error: '존재하지 않는 피드백입니다.',
                };
            }
            prevFeedback.content = content;
            await this.mockExamQuestionFeedback.save([prevFeedback]);
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '피드백을 수정 할 수 없습니다.',
            };
        }
    }
    async deleteMockExamQuestionFeedback(user, deleteMockExamQuestionFeedbackInput) {
        try {
            const { id } = deleteMockExamQuestionFeedbackInput;
            const feedback = await this.mockExamQuestionFeedback.findOne({
                where: { id },
                relations: { user: true },
            });
            if (feedback.user.id !== user.id && user.role !== user_entity_1.UserRole.ADMIN) {
                return { ok: false, error: '권한이 없습니다.' };
            }
            if (!feedback) {
                return {
                    ok: false,
                    error: '존재하지 않는 피드백입니다.',
                };
            }
            this.mockExamQuestionFeedback.delete({ id });
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '피드백을 삭제 할 수 없습니다.',
            };
        }
    }
    async readAllMockExamQuestionFeedback() {
        try {
            const feedbacks = await this.mockExamQuestionFeedback.find();
            return {
                ok: true,
                feedbacks,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '피드백을 찾을 수 없습니다.',
            };
        }
    }
    async getExamTitleWithFeedback(user) {
        try {
            const feedbacks = await this.mockExamQuestionFeedback.find({
                where: [
                    { mockExamQuestion: { mockExam: { user: { id: user.id } } } },
                    {
                        mockExamQuestion: {
                            mockExam: { examCoAuthor: { user: { id: user.id } } },
                        },
                    },
                ],
                relations: {
                    mockExamQuestion: {
                        mockExam: true,
                    },
                },
                order: {
                    mockExamQuestion: {
                        mockExam: {
                            title: 'ASC',
                        },
                    },
                },
            });
            const titles = (0, utils_1.deduplication)(feedbacks.map((feedback) => {
                const { id, title } = feedback.mockExamQuestion.mockExam;
                return {
                    id,
                    title,
                };
            }));
            return {
                ok: true,
                titles,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '시험 리스트를 불러올 수 없습니다.',
            };
        }
    }
    async getFeedbacksWithFilter(getFeedbacksWithFilterInput, user) {
        try {
            const { examId, goodCount, badCount, types } = getFeedbacksWithFilterInput;
            let query = this.mockExamQuestionFeedback
                .createQueryBuilder('feedback')
                .leftJoinAndSelect('feedback.mockExamQuestion', 'mockExamQuestion')
                .leftJoinAndSelect('feedback.recommendation', 'recommendation')
                .leftJoinAndSelect('feedback.user', 'user')
                .leftJoin('mockExamQuestion.mockExam', 'mockExam')
                .leftJoin('mockExam.examCoAuthor', 'examCoAuthor')
                .leftJoin('examCoAuthor.user', 'coAuthorUser')
                .leftJoin('mockExam.user', 'authorUser')
                .where(new typeorm_2.Brackets((qb) => {
                qb.where('authorUser.id = :userId', { userId: user.id }).orWhere('examCoAuthor.user.id =:coAuthorId', {
                    coAuthorId: user.id,
                });
            }));
            if (examId) {
                query = query.andWhere('mockExam.id = :examId', { examId });
            }
            if (types.length >= 1) {
                query = query.andWhere('feedback.type IN (:...types)', { types });
            }
            let feedbacks = await query.getMany();
            feedbacks = feedbacks
                .filter((feedback) => {
                const good = feedback.recommendation.filter((recommedation) => recommedation.type === mock_exam_question_feedback_recommendation_entity_1.QuestionFeedbackRecommendationType.GOOD);
                const bad = feedback.recommendation.filter((recommedation) => recommedation.type === mock_exam_question_feedback_recommendation_entity_1.QuestionFeedbackRecommendationType.BAD);
                return good.length >= goodCount && bad.length >= badCount;
            })
                .map((feedback) => {
                return Object.assign(Object.assign({}, feedback), { recommendationCount: {
                        good: feedback.recommendation.filter((recommedation) => recommedation.type ===
                            mock_exam_question_feedback_recommendation_entity_1.QuestionFeedbackRecommendationType.GOOD).length,
                        bad: feedback.recommendation.filter((recommedation) => recommedation.type === mock_exam_question_feedback_recommendation_entity_1.QuestionFeedbackRecommendationType.BAD).length,
                    } });
            });
            return {
                ok: true,
                feedbacks,
            };
        }
        catch (e) {
            console.log(e);
            return {
                ok: false,
                error: '피드백을 불러올 수 없습니다.',
            };
        }
    }
};
MockExamQuestionFeedbackSerivce = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mock_exam_question_feedback_entity_1.MockExamQuestionFeedback)),
    __param(1, (0, typeorm_1.InjectRepository)(mock_exam_question_entity_1.MockExamQuestion)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(exam_co_author_entity_1.ExamCoAuthor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MockExamQuestionFeedbackSerivce);
exports.MockExamQuestionFeedbackSerivce = MockExamQuestionFeedbackSerivce;
//# sourceMappingURL=mock-exams-question-feedback.service.js.map