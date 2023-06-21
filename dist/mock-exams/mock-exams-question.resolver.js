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
exports.MockExamQuestionResolver = void 0;
const readMockExamQuestionsByMockExamId_dto_1 = require("./dtos/readMockExamQuestionsByMockExamId.dto");
const readMockExamQuestion_dto_1 = require("./dtos/readMockExamQuestion.dto");
const updateApprovedStateOfMockExamQuestion_dto_1 = require("./dtos/updateApprovedStateOfMockExamQuestion.dto");
const readMockExamQuestionNumbers_dto_1 = require("./dtos/readMockExamQuestionNumbers.dto");
const user_entity_1 = require("../users/entities/user.entity");
const readAllMockExamQuestion_dto_1 = require("./dtos/readAllMockExamQuestion.dto");
const createMockExamQuestion_dto_1 = require("./dtos/createMockExamQuestion.dto");
const mock_exam_question_entity_1 = require("./entities/mock-exam-question.entity");
const graphql_1 = require("@nestjs/graphql");
const mock_exams_question_service_1 = require("./mock-exams-question.service");
const role_decorators_1 = require("../auth/role.decorators");
const editMockExamQuestion_dto_1 = require("./dtos/editMockExamQuestion.dto");
const deleteMockExamQuestion_dto_1 = require("./dtos/deleteMockExamQuestion.dto");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const readMockExamQuestionsByState_dto_1 = require("./dtos/readMockExamQuestionsByState.dto");
const readAllQuestions_dto_1 = require("./dtos/readAllQuestions.dto");
let MockExamQuestionResolver = class MockExamQuestionResolver {
    constructor(mockExamQuestionService) {
        this.mockExamQuestionService = mockExamQuestionService;
    }
    createMockExamQuestion(user, createMockExamQuestionInput) {
        return this.mockExamQuestionService.createMockExamQuestion(user, createMockExamQuestionInput);
    }
    editMockExamQuestion(user, editMockExamQuestionInput) {
        return this.mockExamQuestionService.editMockExamQuestion(user, editMockExamQuestionInput);
    }
    deleteMockExamQuestion(user, deleteMockExamQuestionInput) {
        return this.mockExamQuestionService.deleteMockExamQuestion(user, deleteMockExamQuestionInput);
    }
    readAllMockExamQuestion(user) {
        return this.mockExamQuestionService.readAllMockExamQuestion(user);
    }
    async readMockExamQuestionsByState(user, readMockExamQuestionsByStateInput) {
        return this.mockExamQuestionService.readMockExamQuestionsByState(user, readMockExamQuestionsByStateInput);
    }
    async readMockExamQuestionNumbers(readMockExamQuestionNumbersInput) {
        return this.mockExamQuestionService.readMockExamQuestionNumbers(readMockExamQuestionNumbersInput);
    }
    async readMockExamQuestion(user, readMockExamQuestionInput) {
        return this.mockExamQuestionService.readMockExamQuestion(readMockExamQuestionInput, user);
    }
    async updateApprovedStateOfMockExamQuestion(updateApprovedStateOfMockExamQuestionInput) {
        return this.mockExamQuestionService.updateApprovedStateOfMockExamQuestion(updateApprovedStateOfMockExamQuestionInput);
    }
    async readMockExamQuestionsByMockExamId(user, readMockExamQuestionsByMockExamIdInput) {
        return this.mockExamQuestionService.readMockExamQuestionsByMockExamId(readMockExamQuestionsByMockExamIdInput, user);
    }
    async readAllQuestions() {
        return this.mockExamQuestionService.readAllQuestions();
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => createMockExamQuestion_dto_1.CreateMockExamQuestionOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        createMockExamQuestion_dto_1.CreateMockExamQuestionInput]),
    __metadata("design:returntype", void 0)
], MockExamQuestionResolver.prototype, "createMockExamQuestion", null);
__decorate([
    (0, graphql_1.Mutation)(() => editMockExamQuestion_dto_1.EditMockExamQuestionOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        editMockExamQuestion_dto_1.EditMockExamQuestionInput]),
    __metadata("design:returntype", Promise)
], MockExamQuestionResolver.prototype, "editMockExamQuestion", null);
__decorate([
    (0, graphql_1.Mutation)(() => deleteMockExamQuestion_dto_1.DeleteMockExamQuestionOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        deleteMockExamQuestion_dto_1.DeleteMockExamQuestionInput]),
    __metadata("design:returntype", Promise)
], MockExamQuestionResolver.prototype, "deleteMockExamQuestion", null);
__decorate([
    (0, graphql_1.Query)(() => readAllMockExamQuestion_dto_1.ReadAllMockExamQuestionOutput),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MockExamQuestionResolver.prototype, "readAllMockExamQuestion", null);
__decorate([
    (0, graphql_1.Query)(() => readMockExamQuestionsByState_dto_1.ReadMockExamQuestionsByStateOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        readMockExamQuestionsByState_dto_1.ReadMockExamQuestionsByStateInput]),
    __metadata("design:returntype", Promise)
], MockExamQuestionResolver.prototype, "readMockExamQuestionsByState", null);
__decorate([
    (0, graphql_1.Query)(() => readMockExamQuestionNumbers_dto_1.ReadMockExamQuestionNumbersOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [readMockExamQuestionNumbers_dto_1.ReadMockExamQuestionNumbersInput]),
    __metadata("design:returntype", Promise)
], MockExamQuestionResolver.prototype, "readMockExamQuestionNumbers", null);
__decorate([
    (0, graphql_1.Query)(() => readMockExamQuestion_dto_1.ReadMockExamQuestionOutput),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        readMockExamQuestion_dto_1.ReadMockExamQuestionInput]),
    __metadata("design:returntype", Promise)
], MockExamQuestionResolver.prototype, "readMockExamQuestion", null);
__decorate([
    (0, graphql_1.Mutation)(() => updateApprovedStateOfMockExamQuestion_dto_1.UpdateApprovedStateOfMockExamQuestionOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateApprovedStateOfMockExamQuestion_dto_1.UpdateApprovedStateOfMockExamQuestionInput]),
    __metadata("design:returntype", Promise)
], MockExamQuestionResolver.prototype, "updateApprovedStateOfMockExamQuestion", null);
__decorate([
    (0, graphql_1.Query)(() => readMockExamQuestionsByMockExamId_dto_1.ReadMockExamQuestionsByMockExamIdOutput),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        readMockExamQuestionsByMockExamId_dto_1.ReadMockExamQuestionsByMockExamIdInput]),
    __metadata("design:returntype", Promise)
], MockExamQuestionResolver.prototype, "readMockExamQuestionsByMockExamId", null);
__decorate([
    (0, graphql_1.Query)(() => readAllQuestions_dto_1.ReadAllQuestionsOutput),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MockExamQuestionResolver.prototype, "readAllQuestions", null);
MockExamQuestionResolver = __decorate([
    (0, graphql_1.Resolver)(() => mock_exam_question_entity_1.MockExamQuestion),
    __metadata("design:paramtypes", [mock_exams_question_service_1.MockExamQuestionService])
], MockExamQuestionResolver);
exports.MockExamQuestionResolver = MockExamQuestionResolver;
//# sourceMappingURL=mock-exams-question.resolver.js.map