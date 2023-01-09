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
let MockExamQuestionFeedbackSerivce = class MockExamQuestionFeedbackSerivce {
    constructor(mockExamQuestionFeedback, mockExamQuestion, users) {
        this.mockExamQuestionFeedback = mockExamQuestionFeedback;
        this.mockExamQuestion = mockExamQuestion;
        this.users = users;
    }
    async createMockExamQuestionFeedback(createMockExamQuestionFeedbackInput, user) {
        try {
            const { questionId, content } = createMockExamQuestionFeedbackInput;
            const question = await this.mockExamQuestion.findOne({
                where: { id: questionId },
            });
            if (!question) {
                return {
                    ok: false,
                    error: '존재하지 않는 문제입니다.',
                };
            }
            const feedback = this.mockExamQuestionFeedback.create({
                content,
                mockExamQuestion: question,
                user,
            });
            await this.mockExamQuestionFeedback.save(feedback);
            return {
                ok: true,
            };
        }
        catch (_a) {
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
    async deleteMockExamQuestionFeedback(deleteMockExamQuestionFeedbackInput) {
        try {
            const { id } = deleteMockExamQuestionFeedbackInput;
            const feedback = await this.mockExamQuestionFeedback.findOne({
                where: { id },
            });
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
};
MockExamQuestionFeedbackSerivce = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mock_exam_question_feedback_entity_1.MockExamQuestionFeedback)),
    __param(1, (0, typeorm_1.InjectRepository)(mock_exam_question_entity_1.MockExamQuestion)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MockExamQuestionFeedbackSerivce);
exports.MockExamQuestionFeedbackSerivce = MockExamQuestionFeedbackSerivce;
//# sourceMappingURL=mock-exams-question-feedback.service.js.map