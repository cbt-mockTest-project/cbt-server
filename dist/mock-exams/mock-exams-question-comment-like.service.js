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
exports.MockExamQuestionCommentLikeSerivce = void 0;
const mock_exam_question_comment_entity_1 = require("./entities/mock-exam-question-comment.entity");
const user_entity_1 = require("../users/entities/user.entity");
const mock_exam_question_entity_1 = require("./entities/mock-exam-question.entity");
const mock_exam_question_comment_like_entity_1 = require("./entities/mock-exam-question-comment-like.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let MockExamQuestionCommentLikeSerivce = class MockExamQuestionCommentLikeSerivce {
    constructor(mockExamQuestionCommentLike, mockExamQuestionComment, users) {
        this.mockExamQuestionCommentLike = mockExamQuestionCommentLike;
        this.mockExamQuestionComment = mockExamQuestionComment;
        this.users = users;
    }
    async editMockExamQuestionCommentLike(editMockExamQuestionCommentLikeInput, user) {
        try {
            const { commentId } = editMockExamQuestionCommentLikeInput;
            const comment = await this.mockExamQuestionComment.findOne({
                where: {
                    id: commentId,
                },
            });
            if (!comment) {
                return {
                    ok: false,
                    error: '존재하지 않는 댓글입니다.',
                };
            }
            const prevLike = await this.mockExamQuestionCommentLike.findOne({
                where: {
                    user: {
                        id: user.id,
                    },
                    comment: {
                        id: commentId,
                    },
                },
            });
            if (prevLike) {
                await this.mockExamQuestionCommentLike.delete({ id: prevLike.id });
                return {
                    ok: true,
                    currentState: false,
                };
            }
            const newLike = this.mockExamQuestionCommentLike.create({
                user,
                comment,
            });
            await this.mockExamQuestionCommentLike.save(newLike);
            return {
                ok: true,
                currentState: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '좋아요 요청에 실패했습니다.',
            };
        }
    }
    async readMockExamQuestionCommentLikesByQuestinId(readMockExamQuestionCommentLikesByQuestinIdInput) {
        try {
            const { commentId } = readMockExamQuestionCommentLikesByQuestinIdInput;
            const [likes, count] = await this.mockExamQuestionCommentLike.findAndCount({
                where: {
                    comment: { id: commentId },
                },
            });
            return {
                count,
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '댓글을 불러올 수  없습니다.',
            };
        }
    }
};
MockExamQuestionCommentLikeSerivce = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mock_exam_question_comment_like_entity_1.MockExamQuestionCommentLike)),
    __param(1, (0, typeorm_1.InjectRepository)(mock_exam_question_comment_entity_1.MockExamQuestionComment)),
    __param(2, (0, typeorm_1.InjectRepository)(mock_exam_question_entity_1.MockExamQuestion)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MockExamQuestionCommentLikeSerivce);
exports.MockExamQuestionCommentLikeSerivce = MockExamQuestionCommentLikeSerivce;
//# sourceMappingURL=mock-exams-question-comment-like.service.js.map