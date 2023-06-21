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
exports.MockExamQuestionCommentResolver = void 0;
const readMyQuestionComments_dto_1 = require("./dtos/readMyQuestionComments.dto");
const readMockExamQuestionCommentsByQuestinId_dto_1 = require("./dtos/readMockExamQuestionCommentsByQuestinId.dto");
const user_entity_1 = require("../users/entities/user.entity");
const deleteMockExamQuestionComment_dto_1 = require("./dtos/deleteMockExamQuestionComment.dto");
const mock_exam_question_comment_entity_1 = require("./entities/mock-exam-question-comment.entity");
const graphql_1 = require("@nestjs/graphql");
const mock_exams_question_comment_service_1 = require("./mock-exams-question-comment.service");
const role_decorators_1 = require("../auth/role.decorators");
const createMockExamQuestionComment_dto_1 = require("./dtos/createMockExamQuestionComment.dto");
const editMockExamQuestionComment_dto_1 = require("./dtos/editMockExamQuestionComment.dto");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const readExamTitleAndIdByQuestionComment_dto_1 = require("./dtos/readExamTitleAndIdByQuestionComment.dto");
let MockExamQuestionCommentResolver = class MockExamQuestionCommentResolver {
    constructor(mockExamQuestionCommentSerivce) {
        this.mockExamQuestionCommentSerivce = mockExamQuestionCommentSerivce;
    }
    createMockExamQuestionComment(createMockExamQuestionCommentInput, user) {
        return this.mockExamQuestionCommentSerivce.createMockExamQuestionComment(createMockExamQuestionCommentInput, user);
    }
    async editMockExamQuestionComment(editMockExamQuestionCommentInput, user) {
        return this.mockExamQuestionCommentSerivce.editMockExamQuestionComment(editMockExamQuestionCommentInput, user);
    }
    async deleteMockExamQuestionComment(deleteMockExamQuestionCommentInput, user) {
        return this.mockExamQuestionCommentSerivce.deleteMockExamQuestionComment(deleteMockExamQuestionCommentInput, user);
    }
    async readMockExamQuestionCommentsByQuestionId(readMockExamQuestionCommentsByQuestionIdInput, user) {
        return this.mockExamQuestionCommentSerivce.readMockExamQuestionCommentsByQuestionId(readMockExamQuestionCommentsByQuestionIdInput, user);
    }
    async readMyQuestionComments(readMyQuestionCommentsInput, user) {
        return this.mockExamQuestionCommentSerivce.readMyQuestionComments(readMyQuestionCommentsInput, user);
    }
    async readExamTitleAndIdByQuestionComment(user) {
        return this.mockExamQuestionCommentSerivce.readExamTitleAndIdByQuestionComment(user);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => createMockExamQuestionComment_dto_1.CreateMockExamQuestionCommentOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createMockExamQuestionComment_dto_1.CreateMockExamQuestionCommentInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MockExamQuestionCommentResolver.prototype, "createMockExamQuestionComment", null);
__decorate([
    (0, graphql_1.Mutation)(() => editMockExamQuestionComment_dto_1.EditMockExamQuestionCommentOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [editMockExamQuestionComment_dto_1.EditMockExamQuestionCommentInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MockExamQuestionCommentResolver.prototype, "editMockExamQuestionComment", null);
__decorate([
    (0, graphql_1.Mutation)(() => deleteMockExamQuestionComment_dto_1.DeleteMockExamQuestionCommentOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteMockExamQuestionComment_dto_1.DeleteMockExamQuestionCommentInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MockExamQuestionCommentResolver.prototype, "deleteMockExamQuestionComment", null);
__decorate([
    (0, graphql_1.Query)(() => readMockExamQuestionCommentsByQuestinId_dto_1.ReadMockExamQuestionCommentsByQuestionIdOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [readMockExamQuestionCommentsByQuestinId_dto_1.ReadMockExamQuestionCommentsByQuestionIdInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MockExamQuestionCommentResolver.prototype, "readMockExamQuestionCommentsByQuestionId", null);
__decorate([
    (0, graphql_1.Query)(() => readMyQuestionComments_dto_1.ReadMyQuestionCommentsOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [readMyQuestionComments_dto_1.ReadMyQuestionCommentsInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MockExamQuestionCommentResolver.prototype, "readMyQuestionComments", null);
__decorate([
    (0, graphql_1.Query)(() => readExamTitleAndIdByQuestionComment_dto_1.ReadExamTitleAndIdByQuestionCommentOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MockExamQuestionCommentResolver.prototype, "readExamTitleAndIdByQuestionComment", null);
MockExamQuestionCommentResolver = __decorate([
    (0, graphql_1.Resolver)(() => mock_exam_question_comment_entity_1.MockExamQuestionComment),
    __metadata("design:paramtypes", [mock_exams_question_comment_service_1.MockExamQuestionCommentSerivce])
], MockExamQuestionCommentResolver);
exports.MockExamQuestionCommentResolver = MockExamQuestionCommentResolver;
//# sourceMappingURL=mock-exams-question-comment.resolver.js.map