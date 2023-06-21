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
exports.UpdateQuestionCardCategoryOutput = exports.UpdateQuestionCardCategoryInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
const question_card_category_1 = require("../entities/question-card-category");
let UpdateQuestionCardCategoryInput = class UpdateQuestionCardCategoryInput {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], UpdateQuestionCardCategoryInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UpdateQuestionCardCategoryInput.prototype, "name", void 0);
UpdateQuestionCardCategoryInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateQuestionCardCategoryInput);
exports.UpdateQuestionCardCategoryInput = UpdateQuestionCardCategoryInput;
let UpdateQuestionCardCategoryOutput = class UpdateQuestionCardCategoryOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => question_card_category_1.QuestionCardCategory, { nullable: true }),
    __metadata("design:type", question_card_category_1.QuestionCardCategory)
], UpdateQuestionCardCategoryOutput.prototype, "category", void 0);
UpdateQuestionCardCategoryOutput = __decorate([
    (0, graphql_1.ObjectType)()
], UpdateQuestionCardCategoryOutput);
exports.UpdateQuestionCardCategoryOutput = UpdateQuestionCardCategoryOutput;
//# sourceMappingURL=updateQuestionCardCategory.dto.js.map