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
const readAllCategories_dto_1 = require("./dtos/readAllCategories.dto");
const createCategory_dto_1 = require("./dtos/createCategory.dto");
const mock_exams_category_service_1 = require("./mock-exams-category.service");
const mock_exam_category_entity_1 = require("./entities/mock-exam-category.entity");
const graphql_1 = require("@nestjs/graphql");
const role_decorators_1 = require("../auth/role.decorators");
const deleteCategory_dto_1 = require("./dtos/deleteCategory.dto");
const editCategory_dto_1 = require("./dtos/editCategory.dto");
let MockExamCategoryResolver = class MockExamCategoryResolver {
    constructor(mockExamCategoryService) {
        this.mockExamCategoryService = mockExamCategoryService;
    }
    createMockExamCategory(createMockExamCategoryInput) {
        return this.mockExamCategoryService.createMockExamCategory(createMockExamCategoryInput);
    }
    deleteMockExamCategory(deleteMockExamCategoryInput) {
        return this.mockExamCategoryService.deleteMockExamCategory(deleteMockExamCategoryInput);
    }
    editMockExamCategory(editMockExamCategoryInput) {
        return this.mockExamCategoryService.editMockExamCategory(editMockExamCategoryInput);
    }
    readAllMockExamCategories() {
        return this.mockExamCategoryService.readAllMockExamCategories();
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => createCategory_dto_1.CreateMockExamCategoryOutput),
    (0, role_decorators_1.Role)(['ADMIN']),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCategory_dto_1.CreateMockExamCategoryInput]),
    __metadata("design:returntype", Promise)
], MockExamCategoryResolver.prototype, "createMockExamCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => deleteCategory_dto_1.DeleteMockExamCategoryOutput),
    (0, role_decorators_1.Role)(['ADMIN']),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteCategory_dto_1.DeleteMockExamCategoryInput]),
    __metadata("design:returntype", Promise)
], MockExamCategoryResolver.prototype, "deleteMockExamCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => deleteCategory_dto_1.DeleteMockExamCategoryOutput),
    (0, role_decorators_1.Role)(['ADMIN']),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [editCategory_dto_1.EditMockExamCategoryInput]),
    __metadata("design:returntype", Promise)
], MockExamCategoryResolver.prototype, "editMockExamCategory", null);
__decorate([
    (0, graphql_1.Query)(() => readAllCategories_dto_1.ReadAllMockExamCategoriesOutput),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MockExamCategoryResolver.prototype, "readAllMockExamCategories", null);
MockExamCategoryResolver = __decorate([
    (0, graphql_1.Resolver)(() => mock_exam_category_entity_1.MockExamCategory),
    __metadata("design:paramtypes", [mock_exams_category_service_1.MockExamCategoryService])
], MockExamCategoryResolver);
exports.MockExamCategoryResolver = MockExamCategoryResolver;
//# sourceMappingURL=mock-exams-category.resolver.js.map