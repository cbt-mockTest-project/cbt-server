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
exports.MockExamQuestionBookmarkResolver = void 0;
const user_entity_1 = require("../users/entities/user.entity");
const mock_exam_question_bookmark_entity_1 = require("./entities/mock-exam-question-bookmark.entity");
const graphql_1 = require("@nestjs/graphql");
const role_decorators_1 = require("../auth/role.decorators");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const editMockExamQuestionBookmark_dto_1 = require("./dtos/editMockExamQuestionBookmark.dto");
const mock_exams_question_bookmark_service_1 = require("./mock-exams-question-bookmark.service");
const readMockExamQuestionBookmark_dto_1 = require("./dtos/readMockExamQuestionBookmark.dto");
const readExamTitleAndIdOfBookmarkedQuestion_dto_1 = require("./dtos/readExamTitleAndIdOfBookmarkedQuestion.dto");
let MockExamQuestionBookmarkResolver = class MockExamQuestionBookmarkResolver {
    constructor(mockExamQuestionBookmarkSerivce) {
        this.mockExamQuestionBookmarkSerivce = mockExamQuestionBookmarkSerivce;
    }
    async editMockExamQuestionBookmark(editMockExamQuestionBookmarkInput, user) {
        return this.mockExamQuestionBookmarkSerivce.editMockExamQuestionBookmark(editMockExamQuestionBookmarkInput, user);
    }
    async readMockExamQuestionBookmark(readMockExamQuestionBookmarkInput, user) {
        return this.mockExamQuestionBookmarkSerivce.readMockExamQuestionBookmark(readMockExamQuestionBookmarkInput, user);
    }
    async readExamTitleAndIdOfBookmarkedQuestion(user) {
        return this.mockExamQuestionBookmarkSerivce.readExamTitleAndIdOfBookmarkedQuestion(user);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => editMockExamQuestionBookmark_dto_1.EditMockExamQuestionBookmarkOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [editMockExamQuestionBookmark_dto_1.EditMockExamQuestionBookmarkInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MockExamQuestionBookmarkResolver.prototype, "editMockExamQuestionBookmark", null);
__decorate([
    (0, graphql_1.Query)(() => readMockExamQuestionBookmark_dto_1.ReadMockExamQuestionBookmarkOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [readMockExamQuestionBookmark_dto_1.ReadMockExamQuestionBookmarkInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MockExamQuestionBookmarkResolver.prototype, "readMockExamQuestionBookmark", null);
__decorate([
    (0, graphql_1.Query)(() => readExamTitleAndIdOfBookmarkedQuestion_dto_1.ReadExamTitleAndIdOfBookmarkedQuestionOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MockExamQuestionBookmarkResolver.prototype, "readExamTitleAndIdOfBookmarkedQuestion", null);
MockExamQuestionBookmarkResolver = __decorate([
    (0, graphql_1.Resolver)(() => mock_exam_question_bookmark_entity_1.MockExamQuestionBookmark),
    __metadata("design:paramtypes", [mock_exams_question_bookmark_service_1.MockExamQuestionBookmarkSerivce])
], MockExamQuestionBookmarkResolver);
exports.MockExamQuestionBookmarkResolver = MockExamQuestionBookmarkResolver;
//# sourceMappingURL=mock-exams-question-bookmark.resolver.js.map