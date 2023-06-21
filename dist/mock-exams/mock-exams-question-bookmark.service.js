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
exports.MockExamQuestionBookmarkSerivce = void 0;
const utils_1 = require("./../utils/utils");
const user_entity_1 = require("../users/entities/user.entity");
const mock_exam_question_entity_1 = require("./entities/mock-exam-question.entity");
const mock_exam_question_bookmark_entity_1 = require("./entities/mock-exam-question-bookmark.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let MockExamQuestionBookmarkSerivce = class MockExamQuestionBookmarkSerivce {
    constructor(mockExamQuestionBookmark, mockExamQuestion, users) {
        this.mockExamQuestionBookmark = mockExamQuestionBookmark;
        this.mockExamQuestion = mockExamQuestion;
        this.users = users;
    }
    async editMockExamQuestionBookmark(editMockExamQuestionBookmarkInput, user) {
        try {
            const { questionId } = editMockExamQuestionBookmarkInput;
            const question = await this.mockExamQuestion.findOne({
                where: {
                    id: questionId,
                },
            });
            if (!question) {
                return {
                    ok: false,
                    error: '존재하지 않는 문제입니다.',
                };
            }
            const prevBookmark = await this.mockExamQuestionBookmark.findOne({
                where: {
                    user: {
                        id: user.id,
                    },
                    question: {
                        id: questionId,
                    },
                },
            });
            if (prevBookmark) {
                await this.mockExamQuestionBookmark.delete({ id: prevBookmark.id });
                return {
                    ok: true,
                    currentState: false,
                };
            }
            const newBookmark = this.mockExamQuestionBookmark.create({
                user: { id: user.id },
                question: { id: questionId },
            });
            await this.mockExamQuestionBookmark.save(newBookmark);
            return {
                ok: true,
                currentState: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '북마크에 실패했습니다.',
            };
        }
    }
    async readMockExamQuestionBookmark(readMockExamQuestionBookmarkInput, user) {
        try {
            const { examId } = readMockExamQuestionBookmarkInput;
            const bookmarks = await this.mockExamQuestionBookmark.find({
                where: {
                    question: { mockExam: { id: examId } },
                    user: { id: user.id },
                },
                relations: {
                    question: true,
                },
            });
            const questions = bookmarks.map((bookmark) => bookmark.question);
            return {
                ok: true,
                questions,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '북마크된 문제를 찾을 수 없습니다.',
            };
        }
    }
    async readExamTitleAndIdOfBookmarkedQuestion(user) {
        try {
            const bookmarks = await this.mockExamQuestionBookmark.find({
                where: {
                    user: {
                        id: user.id,
                    },
                },
                relations: {
                    question: { mockExam: true },
                },
            });
            const titleAndId = (0, utils_1.deduplication)(bookmarks
                .map((bookmark) => {
                const { title, id } = bookmark.question.mockExam;
                return { title, id };
            })
                .sort((a, b) => (a.title > b.title ? 1 : -1)));
            return { ok: true, titleAndId };
        }
        catch (_a) {
            return { ok: false, error: '시험 리스트를 불러올 수 없습니다.' };
        }
    }
};
MockExamQuestionBookmarkSerivce = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mock_exam_question_bookmark_entity_1.MockExamQuestionBookmark)),
    __param(1, (0, typeorm_1.InjectRepository)(mock_exam_question_entity_1.MockExamQuestion)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MockExamQuestionBookmarkSerivce);
exports.MockExamQuestionBookmarkSerivce = MockExamQuestionBookmarkSerivce;
//# sourceMappingURL=mock-exams-question-bookmark.service.js.map