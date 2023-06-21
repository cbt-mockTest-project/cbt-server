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
exports.UpdateQuestionCardOutput = exports.UpdateQuestionCardInput = void 0;
const question_card_entity_1 = require("./../entities/question-card.entity");
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
let UpdateQuestionCardInput = class UpdateQuestionCardInput {
};
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateQuestionCardInput.prototype, "question", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UpdateQuestionCardInput.prototype, "solution", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], UpdateQuestionCardInput.prototype, "questionId", void 0);
UpdateQuestionCardInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateQuestionCardInput);
exports.UpdateQuestionCardInput = UpdateQuestionCardInput;
let UpdateQuestionCardOutput = class UpdateQuestionCardOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => question_card_entity_1.QuestionCard, { nullable: true }),
    __metadata("design:type", question_card_entity_1.QuestionCard)
], UpdateQuestionCardOutput.prototype, "questionCard", void 0);
UpdateQuestionCardOutput = __decorate([
    (0, graphql_1.ObjectType)()
], UpdateQuestionCardOutput);
exports.UpdateQuestionCardOutput = UpdateQuestionCardOutput;
//# sourceMappingURL=updateQuestionCard.dto.js.map