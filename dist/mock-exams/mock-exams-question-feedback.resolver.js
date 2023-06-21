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
exports.MockExamQuestionFeedbackResolver = void 0;
const user_entity_1 = require("../users/entities/user.entity");
const deleteMockExamQuestionFeedback_dto_1 = require("./dtos/deleteMockExamQuestionFeedback.dto");
const mock_exam_question_feedback_entity_1 = require("./entities/mock-exam-question-feedback.entity");
const graphql_1 = require("@nestjs/graphql");
const mock_exams_question_feedback_service_1 = require("./mock-exams-question-feedback.service");
const role_decorators_1 = require("../auth/role.decorators");
const createMockExamQuestionFeedback_dto_1 = require("./dtos/createMockExamQuestionFeedback.dto");
const editMockExamQuestionFeedback_dto_1 = require("./dtos/editMockExamQuestionFeedback.dto");
const readAllMockExamQuestionFeedback_dto_1 = require("./dtos/readAllMockExamQuestionFeedback.dto");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const getExamTitleWithFeedback_dto_1 = require("./dtos/getExamTitleWithFeedback.dto");
const getFeedbacksWithFilter_dto_1 = require("./dtos/getFeedbacksWithFilter.dto");
let MockExamQuestionFeedbackResolver = class MockExamQuestionFeedbackResolver {
    constructor(mockExamQuestionFeedbackSerivce) {
        this.mockExamQuestionFeedbackSerivce = mockExamQuestionFeedbackSerivce;
    }
    createMockExamQuestionFeedback(createMockExamQuestionFeedbackInput, user) {
        return this.mockExamQuestionFeedbackSerivce.createMockExamQuestionFeedback(createMockExamQuestionFeedbackInput, user);
    }
    async editMockExamQuestionFeedback(editMockExamQuestionFeedbackInput) {
        return this.mockExamQuestionFeedbackSerivce.editMockExamQuestionFeedback(editMockExamQuestionFeedbackInput);
    }
    async deleteMockExamQuestionFeedback(user, deleteMockExamQuestionFeedbackInput) {
        return this.mockExamQuestionFeedbackSerivce.deleteMockExamQuestionFeedback(user, deleteMockExamQuestionFeedbackInput);
    }
    async readAllMockExamQuestionFeedback() {
        return this.mockExamQuestionFeedbackSerivce.readAllMockExamQuestionFeedback();
    }
    async getExamTitleWithFeedback(user) {
        return this.mockExamQuestionFeedbackSerivce.getExamTitleWithFeedback(user);
    }
    async getFeedbacksWithFilter(getFeedbacksWithFilterInput, user) {
        return this.mockExamQuestionFeedbackSerivce.getFeedbacksWithFilter(getFeedbacksWithFilterInput, user);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => createMockExamQuestionFeedback_dto_1.CreateMockExamQuestionFeedbackOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createMockExamQuestionFeedback_dto_1.CreateMockExamQuestionFeedbackInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MockExamQuestionFeedbackResolver.prototype, "createMockExamQuestionFeedback", null);
__decorate([
    (0, graphql_1.Mutation)(() => editMockExamQuestionFeedback_dto_1.EditMockExamQuestionFeedbackOutput),
    (0, role_decorators_1.Role)(['ADMIN']),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [editMockExamQuestionFeedback_dto_1.EditMockExamQuestionFeedbackInput]),
    __metadata("design:returntype", Promise)
], MockExamQuestionFeedbackResolver.prototype, "editMockExamQuestionFeedback", null);
__decorate([
    (0, graphql_1.Mutation)(() => deleteMockExamQuestionFeedback_dto_1.DeleteMockExamQuestionFeedbackOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        deleteMockExamQuestionFeedback_dto_1.DeleteMockExamQuestionFeedbackInput]),
    __metadata("design:returntype", Promise)
], MockExamQuestionFeedbackResolver.prototype, "deleteMockExamQuestionFeedback", null);
__decorate([
    (0, graphql_1.Query)(() => readAllMockExamQuestionFeedback_dto_1.ReadAllMockExamQuestionFeedbackOutput),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MockExamQuestionFeedbackResolver.prototype, "readAllMockExamQuestionFeedback", null);
__decorate([
    (0, graphql_1.Query)(() => getExamTitleWithFeedback_dto_1.GetExamTitleWithFeedbackOutput),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MockExamQuestionFeedbackResolver.prototype, "getExamTitleWithFeedback", null);
__decorate([
    (0, graphql_1.Query)(() => getFeedbacksWithFilter_dto_1.GetFeedbacksWithFilterOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getFeedbacksWithFilter_dto_1.GetFeedbacksWithFilterInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MockExamQuestionFeedbackResolver.prototype, "getFeedbacksWithFilter", null);
MockExamQuestionFeedbackResolver = __decorate([
    (0, graphql_1.Resolver)(() => mock_exam_question_feedback_entity_1.MockExamQuestionFeedback),
    __metadata("design:paramtypes", [mock_exams_question_feedback_service_1.MockExamQuestionFeedbackSerivce])
], MockExamQuestionFeedbackResolver);
exports.MockExamQuestionFeedbackResolver = MockExamQuestionFeedbackResolver;
//# sourceMappingURL=mock-exams-question-feedback.resolver.js.map