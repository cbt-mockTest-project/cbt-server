"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionCardModule = void 0;
const question_card_resolver_1 = require("./question-card.resolver");
const question_card_service_1 = require("./question-card.service");
const question_card_category_service_1 = require("./question-card-category.service");
const question_card_category_1 = require("./entities/question-card-category");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const question_card_entity_1 = require("./entities/question-card.entity");
const question_card_category_resolver_1 = require("./question-card-category.resolver");
let QuestionCardModule = class QuestionCardModule {
};
QuestionCardModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([question_card_entity_1.QuestionCard, question_card_category_1.QuestionCardCategory])],
        providers: [
            question_card_resolver_1.QuestionCardResolver,
            question_card_service_1.QuestionCardService,
            question_card_category_service_1.QuestionCardCategoryService,
            question_card_category_resolver_1.QuestionCardCategoryResolver,
        ],
    })
], QuestionCardModule);
exports.QuestionCardModule = QuestionCardModule;
//# sourceMappingURL=question-card.module.js.map