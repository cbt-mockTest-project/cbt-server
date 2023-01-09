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
exports.MockExamResolver = void 0;
const findMyExamHistory_dto_1 = require("./dtos/findMyExamHistory.dto");
const user_entity_1 = require("./../users/entities/user.entity");
const readMockExam_dto_1 = require("./dtos/readMockExam.dto");
const readAllMockExam_dto_1 = require("./dtos/readAllMockExam.dto");
const createMockExam_dto_1 = require("./dtos/createMockExam.dto");
const mock_exam_entity_1 = require("./entities/mock-exam.entity");
const graphql_1 = require("@nestjs/graphql");
const mock_exams_service_1 = require("./mock-exams.service");
const role_decorators_1 = require("../auth/role.decorators");
const editMockExam_dto_1 = require("./dtos/editMockExam.dto");
const deleteMockExam_dto_1 = require("./dtos/deleteMockExam.dto");
const searchMockExam_dto_1 = require("./dtos/searchMockExam.dto");
const readMockExamTitlesByCateory_dto_1 = require("./dtos/readMockExamTitlesByCateory.dto");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
let MockExamResolver = class MockExamResolver {
    constructor(mockExamService) {
        this.mockExamService = mockExamService;
    }
    createMockExam(createMockExamInput) {
        return this.mockExamService.createMockExam(createMockExamInput);
    }
    editMockExam(editMockExamInput) {
        return this.mockExamService.editMockExam(editMockExamInput);
    }
    deleteMockExam(deleteMockExamInput) {
        return this.mockExamService.deleteMockExam(deleteMockExamInput);
    }
    readAllMockExam(readAllMockExamsInput) {
        return this.mockExamService.readAllMockExam(readAllMockExamsInput);
    }
    searchMockExam(searchMockExamInput) {
        return this.mockExamService.searchMockExam(searchMockExamInput);
    }
    readMockExam(readMockExamInput) {
        return this.mockExamService.readMockExam(readMockExamInput);
    }
    async readMockExamTitlesByCateory(readMockExamTitlesByCateoryInput) {
        return this.mockExamService.readMockExamTitlesByCateory(readMockExamTitlesByCateoryInput);
    }
    async findMyExamHistory(user, findMyExamHistoryInput) {
        return this.mockExamService.findMyExamHistory(user, findMyExamHistoryInput);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => createMockExam_dto_1.CreateMockExamOutput),
    (0, role_decorators_1.Role)(['ADMIN']),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createMockExam_dto_1.CreateMockExamInput]),
    __metadata("design:returntype", Promise)
], MockExamResolver.prototype, "createMockExam", null);
__decorate([
    (0, graphql_1.Mutation)(() => editMockExam_dto_1.EditMockExamOutput),
    (0, role_decorators_1.Role)(['ADMIN']),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [editMockExam_dto_1.EditMockExamInput]),
    __metadata("design:returntype", Promise)
], MockExamResolver.prototype, "editMockExam", null);
__decorate([
    (0, graphql_1.Mutation)(() => deleteMockExam_dto_1.DeleteMockExamOutput),
    (0, role_decorators_1.Role)(['ADMIN']),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteMockExam_dto_1.DeleteMockExamInput]),
    __metadata("design:returntype", Promise)
], MockExamResolver.prototype, "deleteMockExam", null);
__decorate([
    (0, graphql_1.Query)(() => readAllMockExam_dto_1.ReadAllMockExamsOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [readAllMockExam_dto_1.ReadAllMockExamsInput]),
    __metadata("design:returntype", Promise)
], MockExamResolver.prototype, "readAllMockExam", null);
__decorate([
    (0, graphql_1.Query)(() => searchMockExam_dto_1.SearchMockExamOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [searchMockExam_dto_1.SearchMockExamInput]),
    __metadata("design:returntype", Promise)
], MockExamResolver.prototype, "searchMockExam", null);
__decorate([
    (0, graphql_1.Query)(() => readMockExam_dto_1.ReadMockExamOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [readMockExam_dto_1.ReadMockExamInput]),
    __metadata("design:returntype", Promise)
], MockExamResolver.prototype, "readMockExam", null);
__decorate([
    (0, graphql_1.Query)(() => readMockExamTitlesByCateory_dto_1.ReadMockExamTitlesByCateoryOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [readMockExamTitlesByCateory_dto_1.ReadMockExamTitlesByCateoryInput]),
    __metadata("design:returntype", Promise)
], MockExamResolver.prototype, "readMockExamTitlesByCateory", null);
__decorate([
    (0, graphql_1.Query)(() => findMyExamHistory_dto_1.FindMyExamHistoryOutput),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        findMyExamHistory_dto_1.FindMyExamHistoryInput]),
    __metadata("design:returntype", Promise)
], MockExamResolver.prototype, "findMyExamHistory", null);
MockExamResolver = __decorate([
    (0, graphql_1.Resolver)(() => mock_exam_entity_1.MockExam),
    __metadata("design:paramtypes", [mock_exams_service_1.MockExamService])
], MockExamResolver);
exports.MockExamResolver = MockExamResolver;
//# sourceMappingURL=mock-exams.resolver.js.map