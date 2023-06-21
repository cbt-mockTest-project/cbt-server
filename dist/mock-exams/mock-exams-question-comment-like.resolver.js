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
exports.MockExamQuestionCommentLikeResolver = void 0;
const readMockExamQuestionCommentLikesByQuestinId_dto_1 = require("./dtos/readMockExamQuestionCommentLikesByQuestinId.dto");
const user_entity_1 = require("../users/entities/user.entity");
const mock_exam_question_comment_like_entity_1 = require("./entities/mock-exam-question-comment-like.entity");
const graphql_1 = require("@nestjs/graphql");
const mock_exams_question_comment_like_service_1 = require("./mock-exams-question-comment-like.service");
const role_decorators_1 = require("../auth/role.decorators");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const editMockExamQuestionCommentLike_dto_1 = require("./dtos/editMockExamQuestionCommentLike.dto");
let MockExamQuestionCommentLikeResolver = class MockExamQuestionCommentLikeResolver {
    constructor(mockExamQuestionCommentLikeSerivce) {
        this.mockExamQuestionCommentLikeSerivce = mockExamQuestionCommentLikeSerivce;
    }
    async editMockExamQuestionCommentLike(editMockExamQuestionCommentLikeInput, user) {
        return this.mockExamQuestionCommentLikeSerivce.editMockExamQuestionCommentLike(editMockExamQuestionCommentLikeInput, user);
    }
    async readMockExamQuestionCommentLikesByQuestinId(readMockExamQuestionCommentLikesByQuestinIdInput) {
        return this.mockExamQuestionCommentLikeSerivce.readMockExamQuestionCommentLikesByQuestinId(readMockExamQuestionCommentLikesByQuestinIdInput);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => editMockExamQuestionCommentLike_dto_1.EditMockExamQuestionCommentLikeOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [editMockExamQuestionCommentLike_dto_1.EditMockExamQuestionCommentLikeInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MockExamQuestionCommentLikeResolver.prototype, "editMockExamQuestionCommentLike", null);
__decorate([
    (0, graphql_1.Query)(() => readMockExamQuestionCommentLikesByQuestinId_dto_1.ReadMockExamQuestionCommentLikesByQuestinIdOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [readMockExamQuestionCommentLikesByQuestinId_dto_1.ReadMockExamQuestionCommentLikesByQuestinIdInput]),
    __metadata("design:returntype", Promise)
], MockExamQuestionCommentLikeResolver.prototype, "readMockExamQuestionCommentLikesByQuestinId", null);
MockExamQuestionCommentLikeResolver = __decorate([
    (0, graphql_1.Resolver)(() => mock_exam_question_comment_like_entity_1.MockExamQuestionCommentLike),
    __metadata("design:paramtypes", [mock_exams_question_comment_like_service_1.MockExamQuestionCommentLikeSerivce])
], MockExamQuestionCommentLikeResolver);
exports.MockExamQuestionCommentLikeResolver = MockExamQuestionCommentLikeResolver;
//# sourceMappingURL=mock-exams-question-comment-like.resolver.js.map