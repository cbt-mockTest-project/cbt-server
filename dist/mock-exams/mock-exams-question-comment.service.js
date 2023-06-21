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
exports.MockExamQuestionCommentSerivce = void 0;
const user_entity_1 = require("../users/entities/user.entity");
const mock_exam_question_entity_1 = require("./entities/mock-exam-question.entity");
const mock_exam_question_comment_entity_1 = require("./entities/mock-exam-question-comment.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mock_exam_question_comment_like_entity_1 = require("./entities/mock-exam-question-comment-like.entity");
const mock_exam_entity_1 = require("./entities/mock-exam.entity");
let MockExamQuestionCommentSerivce = class MockExamQuestionCommentSerivce {
    constructor(mockExamQuestionCommentLike, mockExamQuestionComment, mockExamQuestion, mockExam, users) {
        this.mockExamQuestionCommentLike = mockExamQuestionCommentLike;
        this.mockExamQuestionComment = mockExamQuestionComment;
        this.mockExamQuestion = mockExamQuestion;
        this.mockExam = mockExam;
        this.users = users;
    }
    async createMockExamQuestionComment(createMockExamQuestionCommentInput, user) {
        try {
            if (!user)
                return { ok: false, error: '로그인이 필요합니다.' };
            const { questionId, content } = createMockExamQuestionCommentInput;
            const question = await this.mockExamQuestion.findOne({
                where: { id: questionId },
            });
            if (!question) {
                return {
                    ok: false,
                    error: '존재하지 않는 문제입니다.',
                };
            }
            const comment = this.mockExamQuestionComment.create({
                content,
                question,
                user,
            });
            await this.mockExamQuestionComment.save(comment);
            return {
                comment,
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '댓글을 작성할 수 없습니다.',
            };
        }
    }
    async editMockExamQuestionComment(editMockExamQuestionCommentInput, user) {
        try {
            const { id, content } = editMockExamQuestionCommentInput;
            const prevComment = await this.mockExamQuestionComment.findOne({
                where: {
                    id,
                    user: {
                        id: user.id,
                    },
                },
            });
            if (!prevComment) {
                return {
                    ok: false,
                    error: '존재하지 않는 댓글입니다.',
                };
            }
            prevComment.content = content;
            await this.mockExamQuestionComment.save([prevComment]);
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '댓글을 수정할 수 없습니다.',
            };
        }
    }
    async deleteMockExamQuestionComment(deleteMockExamQuestionCommentInput, user) {
        try {
            const { id } = deleteMockExamQuestionCommentInput;
            const Comment = await this.mockExamQuestionComment.findOne({
                where: {
                    id,
                    user: {
                        id: user.id,
                    },
                },
            });
            if (!Comment) {
                return {
                    ok: false,
                    error: '존재하지 않는 댓글입니다.',
                };
            }
            this.mockExamQuestionComment.delete({ id });
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '댓글을 삭제 할 수 없습니다.',
            };
        }
    }
    async readMockExamQuestionCommentsByQuestionId(readMockExamQuestionCommentsByQuestionIdInput, user) {
        try {
            const { questionId } = readMockExamQuestionCommentsByQuestionIdInput;
            let comments = await this.mockExamQuestionComment.find({
                where: {
                    question: { id: questionId },
                },
                relations: { user: true },
            });
            [];
            if (comments && comments.length >= 1) {
                comments = await Promise.all(comments.map(async (comment) => {
                    const like = user
                        ? await this.mockExamQuestionCommentLike.findOne({
                            where: {
                                user: { id: user.id },
                                comment: {
                                    id: comment.id,
                                },
                            },
                        })
                        : false;
                    const [likes, likesCount] = await this.mockExamQuestionCommentLike.findAndCount({
                        where: {
                            comment: {
                                id: comment.id,
                            },
                        },
                    });
                    if (like) {
                        return Object.assign(Object.assign({}, comment), { likeState: true, likesCount });
                    }
                    return Object.assign(Object.assign({}, comment), { likeState: false, likesCount });
                }));
            }
            comments = comments.sort((a, b) => b.likesCount - a.likesCount);
            return {
                comments,
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
    async readMyQuestionComments(readMyQuestionCommentsInput, user) {
        try {
            const { examId } = readMyQuestionCommentsInput;
            const where = examId
                ? {
                    mockExam: { id: examId },
                    mockExamQuestionComment: { user: { id: user.id } },
                }
                : {
                    mockExamQuestionComment: { user: { id: user.id } },
                };
            const questions = await this.mockExamQuestion.find({
                relations: {
                    mockExam: true,
                    mockExamQuestionComment: true,
                },
                where,
            });
            return {
                ok: true,
                questions,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '댓글을 불러올 수  없습니다.',
            };
        }
    }
    async readExamTitleAndIdByQuestionComment(user) {
        try {
            const exams = await this.mockExam.find({
                where: {
                    mockExamQuestion: {
                        mockExamQuestionComment: {
                            user: { id: user.id },
                        },
                    },
                },
            });
            const examTitleAndId = exams.map((exam) => ({
                id: exam.id,
                title: exam.title,
            }));
            return {
                ok: true,
                examTitleAndId,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '카테고리를 불러올 수  없습니다.',
            };
        }
    }
};
MockExamQuestionCommentSerivce = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mock_exam_question_comment_like_entity_1.MockExamQuestionCommentLike)),
    __param(1, (0, typeorm_1.InjectRepository)(mock_exam_question_comment_entity_1.MockExamQuestionComment)),
    __param(2, (0, typeorm_1.InjectRepository)(mock_exam_question_entity_1.MockExamQuestion)),
    __param(3, (0, typeorm_1.InjectRepository)(mock_exam_entity_1.MockExam)),
    __param(4, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MockExamQuestionCommentSerivce);
exports.MockExamQuestionCommentSerivce = MockExamQuestionCommentSerivce;
//# sourceMappingURL=mock-exams-question-comment.service.js.map