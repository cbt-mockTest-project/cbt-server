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
exports.CreateQuestionCardCategoryOutput = exports.CreateQuestionCardCategoryInput = void 0;
const question_card_category_1 = require("../entities/question-card-category");
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
let CreateQuestionCardCategoryInput = class CreateQuestionCardCategoryInput {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateQuestionCardCategoryInput.prototype, "name", void 0);
CreateQuestionCardCategoryInput = __decorate([
    (0, graphql_1.InputType)()
], CreateQuestionCardCategoryInput);
exports.CreateQuestionCardCategoryInput = CreateQuestionCardCategoryInput;
let CreateQuestionCardCategoryOutput = class CreateQuestionCardCategoryOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => question_card_category_1.QuestionCardCategory, { nullable: true }),
    __metadata("design:type", question_card_category_1.QuestionCardCategory)
], CreateQuestionCardCategoryOutput.prototype, "category", void 0);
CreateQuestionCardCategoryOutput = __decorate([
    (0, graphql_1.ObjectType)()
], CreateQuestionCardCategoryOutput);
exports.CreateQuestionCardCategoryOutput = CreateQuestionCardCategoryOutput;
//# sourceMappingURL=createQuestionCardCategory.dto.js.map