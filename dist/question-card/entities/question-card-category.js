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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionCardCategory = void 0;
const core_entity_1 = require("../../common/entities/core.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const question_card_entity_1 = require("./question-card.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let QuestionCardCategory = class QuestionCardCategory extends core_entity_1.CoreEntity {
};
__decorate([
    (0, graphql_1.Field)(() => question_card_entity_1.QuestionCard),
    (0, typeorm_1.OneToMany)(() => question_card_entity_1.QuestionCard, (questionCard) => questionCard.category),
    __metadata("design:type", Array)
], QuestionCardCategory.prototype, "questionCard", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], QuestionCardCategory.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.questionCardCategorys),
    __metadata("design:type", user_entity_1.User)
], QuestionCardCategory.prototype, "user", void 0);
QuestionCardCategory = __decorate([
    (0, graphql_1.InputType)('QuestionCardCategoryInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], QuestionCardCategory);
exports.QuestionCardCategory = QuestionCardCategory;
//# sourceMappingURL=question-card-category.js.map