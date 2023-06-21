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
exports.QuestionCardCategoryResolver = void 0;
const DeleteQuestionCardCategory_dto_1 = require("./dtos/DeleteQuestionCardCategory.dto");
const createQuestionCardCategory_dto_1 = require("./dtos/createQuestionCardCategory.dto");
const updateQuestionCardCategory_dto_1 = require("./dtos/updateQuestionCardCategory.dto");
const user_entity_1 = require("../users/entities/user.entity");
const graphql_1 = require("@nestjs/graphql");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const readMyQuestionCardCategories_dto_1 = require("./dtos/readMyQuestionCardCategories.dto");
const question_card_category_1 = require("./entities/question-card-category");
const question_card_category_service_1 = require("./question-card-category.service");
const role_decorators_1 = require("../auth/role.decorators");
let QuestionCardCategoryResolver = class QuestionCardCategoryResolver {
    constructor(questionCardCategoryService) {
        this.questionCardCategoryService = questionCardCategoryService;
    }
    readMyQuestionCardCategories(user) {
        return this.questionCardCategoryService.readMyQuestionCardCategories(user);
    }
    updateQuestionCardCategory(updateQuestionCardCategoryInput, user) {
        return this.questionCardCategoryService.updateQuestionCardCategory(user, updateQuestionCardCategoryInput);
    }
    createQuestionCardCategory(createQuestionCardCategoryInput, user) {
        return this.questionCardCategoryService.createQuestionCardCategory(createQuestionCardCategoryInput, user);
    }
    deleteQuestionCardCategory(deleteQuestionCardCategoryInput, user) {
        return this.questionCardCategoryService.deleteQuestionCardCategory(user, deleteQuestionCardCategoryInput);
    }
};
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Query)(() => readMyQuestionCardCategories_dto_1.ReadMyQuestionCardCategoriesOutput),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], QuestionCardCategoryResolver.prototype, "readMyQuestionCardCategories", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => updateQuestionCardCategory_dto_1.UpdateQuestionCardCategoryOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateQuestionCardCategory_dto_1.UpdateQuestionCardCategoryInput,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], QuestionCardCategoryResolver.prototype, "updateQuestionCardCategory", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => createQuestionCardCategory_dto_1.CreateQuestionCardCategoryOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createQuestionCardCategory_dto_1.CreateQuestionCardCategoryInput,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], QuestionCardCategoryResolver.prototype, "createQuestionCardCategory", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => DeleteQuestionCardCategory_dto_1.DeleteQuestionCardCategoryOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DeleteQuestionCardCategory_dto_1.DeleteQuestionCardCategoryInput,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], QuestionCardCategoryResolver.prototype, "deleteQuestionCardCategory", null);
QuestionCardCategoryResolver = __decorate([
    (0, graphql_1.Resolver)(() => question_card_category_1.QuestionCardCategory),
    __metadata("design:paramtypes", [question_card_category_service_1.QuestionCardCategoryService])
], QuestionCardCategoryResolver);
exports.QuestionCardCategoryResolver = QuestionCardCategoryResolver;
//# sourceMappingURL=question-card-category.resolver.js.map