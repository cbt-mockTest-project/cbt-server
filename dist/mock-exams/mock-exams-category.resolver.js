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
exports.MockExamCategoryResolver = void 0;
const readMyMockExamCategories_dto_1 = require("./dtos/readMyMockExamCategories.dto");
const user_entity_1 = require("../users/entities/user.entity");
const readAllCategories_dto_1 = require("./dtos/readAllCategories.dto");
const createCategory_dto_1 = require("./dtos/createCategory.dto");
const mock_exams_category_service_1 = require("./mock-exams-category.service");
const mock_exam_category_entity_1 = require("./entities/mock-exam-category.entity");
const graphql_1 = require("@nestjs/graphql");
const role_decorators_1 = require("../auth/role.decorators");
const deleteCategory_dto_1 = require("./dtos/deleteCategory.dto");
const editCategory_dto_1 = require("./dtos/editCategory.dto");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
let MockExamCategoryResolver = class MockExamCategoryResolver {
    constructor(mockExamCategoryService) {
        this.mockExamCategoryService = mockExamCategoryService;
    }
    createMockExamCategory(user, createMockExamCategoryInput) {
        return this.mockExamCategoryService.createMockExamCategory(user, createMockExamCategoryInput);
    }
    deleteMockExamCategory(user, deleteMockExamCategoryInput) {
        return this.mockExamCategoryService.deleteMockExamCategory(user, deleteMockExamCategoryInput);
    }
    editMockExamCategory(user, editMockExamCategoryInput) {
        return this.mockExamCategoryService.editMockExamCategory(user, editMockExamCategoryInput);
    }
    readAllMockExamCategories(readAllMockExamCategoriesInput) {
        return this.mockExamCategoryService.readAllMockExamCategories(readAllMockExamCategoriesInput);
    }
    readMyMockExamCategories(user) {
        return this.mockExamCategoryService.readMyMockExamCategories(user);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => createCategory_dto_1.CreateMockExamCategoryOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        createCategory_dto_1.CreateMockExamCategoryInput]),
    __metadata("design:returntype", Promise)
], MockExamCategoryResolver.prototype, "createMockExamCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => deleteCategory_dto_1.DeleteMockExamCategoryOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, deleteCategory_dto_1.DeleteMockExamCategoryInput]),
    __metadata("design:returntype", Promise)
], MockExamCategoryResolver.prototype, "deleteMockExamCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => deleteCategory_dto_1.DeleteMockExamCategoryOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, editCategory_dto_1.EditMockExamCategoryInput]),
    __metadata("design:returntype", Promise)
], MockExamCategoryResolver.prototype, "editMockExamCategory", null);
__decorate([
    (0, graphql_1.Query)(() => readAllCategories_dto_1.ReadAllMockExamCategoriesOutput),
    __param(0, (0, graphql_1.Args)('input', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [readAllCategories_dto_1.ReadAllMockExamCategoriesInput]),
    __metadata("design:returntype", Promise)
], MockExamCategoryResolver.prototype, "readAllMockExamCategories", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Query)(() => readMyMockExamCategories_dto_1.ReadMyMockExamCategoriesOutput),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MockExamCategoryResolver.prototype, "readMyMockExamCategories", null);
MockExamCategoryResolver = __decorate([
    (0, graphql_1.Resolver)(() => mock_exam_category_entity_1.MockExamCategory),
    __metadata("design:paramtypes", [mock_exams_category_service_1.MockExamCategoryService])
], MockExamCategoryResolver);
exports.MockExamCategoryResolver = MockExamCategoryResolver;
//# sourceMappingURL=mock-exams-category.resolver.js.map