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
exports.CreateMockExamQuestionMultipleChoiceOutput = exports.CreateMockExamQuestionMultipleChoiceInput = void 0;
const mock_exam_question_multiple_choice_entity_1 = require("./../entities/mock-exam-question-multiple-choice.entity");
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
let CreateMockExamQuestionMultipleChoiceInput = class CreateMockExamQuestionMultipleChoiceInput extends (0, graphql_1.PickType)(mock_exam_question_multiple_choice_entity_1.MockExamQuestionMultipleChoice, ['answer', 'options']) {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], CreateMockExamQuestionMultipleChoiceInput.prototype, "questionId", void 0);
CreateMockExamQuestionMultipleChoiceInput = __decorate([
    (0, graphql_1.InputType)()
], CreateMockExamQuestionMultipleChoiceInput);
exports.CreateMockExamQuestionMultipleChoiceInput = CreateMockExamQuestionMultipleChoiceInput;
let CreateMockExamQuestionMultipleChoiceOutput = class CreateMockExamQuestionMultipleChoiceOutput extends output_dto_1.CoreOutput {
};
CreateMockExamQuestionMultipleChoiceOutput = __decorate([
    (0, graphql_1.ObjectType)()
], CreateMockExamQuestionMultipleChoiceOutput);
exports.CreateMockExamQuestionMultipleChoiceOutput = CreateMockExamQuestionMultipleChoiceOutput;
//# sourceMappingURL=createMockExamQuestionMultipleChoice.dto.js.map