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
exports.QuestionCardResolver = void 0;
const deleteQuestionCard_dto_1 = require("./dtos/deleteQuestionCard.dto");
const user_entity_1 = require("../users/entities/user.entity");
const graphql_1 = require("@nestjs/graphql");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const readMyQuestionCards_dto_1 = require("./dtos/readMyQuestionCards.dto");
const readQuestionCard_dto_1 = require("./dtos/readQuestionCard.dto");
const question_card_entity_1 = require("./entities/question-card.entity");
const question_card_service_1 = require("./question-card.service");
const createQuestionCard_dto_1 = require("./dtos/createQuestionCard.dto");
const updateQuestionCard_dto_1 = require("./dtos/updateQuestionCard.dto");
const role_decorators_1 = require("../auth/role.decorators");
let QuestionCardResolver = class QuestionCardResolver {
    constructor(questionCardService) {
        this.questionCardService = questionCardService;
    }
    readQuestionCard(readQusetionCardInput) {
        return this.questionCardService.readQuestionCard(readQusetionCardInput);
    }
    readMyQuestionCards(readMyQuestionCardsInput, user) {
        return this.questionCardService.readMyQuestionCards(readMyQuestionCardsInput, user);
    }
    createQuestionCard(createQuestionCardInput, user) {
        return this.questionCardService.createQuestionCard(user, createQuestionCardInput);
    }
    updateQuestionCard(updateQuestionCardInput, user) {
        return this.questionCardService.updateQuestionCard(user, updateQuestionCardInput);
    }
    deleteQuestionCards(deleteQuestionCardsInput, user) {
        return this.questionCardService.deleteQuestionCards(deleteQuestionCardsInput, user);
    }
};
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Query)(() => readQuestionCard_dto_1.ReadQuestionCardOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [readQuestionCard_dto_1.ReadQuestionCardInput]),
    __metadata("design:returntype", void 0)
], QuestionCardResolver.prototype, "readQuestionCard", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Query)(() => readMyQuestionCards_dto_1.ReadMyQuestionCardsOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [readMyQuestionCards_dto_1.ReadMyQuestionCardsInput,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], QuestionCardResolver.prototype, "readMyQuestionCards", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => createQuestionCard_dto_1.CreateQuestionCardOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createQuestionCard_dto_1.CreateQuestionCardInput,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], QuestionCardResolver.prototype, "createQuestionCard", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => updateQuestionCard_dto_1.UpdateQuestionCardOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateQuestionCard_dto_1.UpdateQuestionCardInput,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], QuestionCardResolver.prototype, "updateQuestionCard", null);
__decorate([
    (0, graphql_1.Mutation)(() => deleteQuestionCard_dto_1.DeleteQuestionCardsOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteQuestionCard_dto_1.DeleteQuestionCardsInput,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], QuestionCardResolver.prototype, "deleteQuestionCards", null);
QuestionCardResolver = __decorate([
    (0, graphql_1.Resolver)(() => question_card_entity_1.QuestionCard),
    __metadata("design:paramtypes", [question_card_service_1.QuestionCardService])
], QuestionCardResolver);
exports.QuestionCardResolver = QuestionCardResolver;
//# sourceMappingURL=question-card.resolver.js.map