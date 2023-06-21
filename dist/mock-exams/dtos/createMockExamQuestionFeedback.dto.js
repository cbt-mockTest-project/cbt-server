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
exports.CreateMockExamQuestionFeedbackOutput = exports.CreateMockExamQuestionFeedbackInput = void 0;
const output_dto_1 = require("./../../common/dtos/output.dto");
const graphql_1 = require("@nestjs/graphql");
const mock_exam_question_feedback_entity_1 = require("../entities/mock-exam-question-feedback.entity");
let CreateMockExamQuestionFeedbackInput = class CreateMockExamQuestionFeedbackInput extends (0, graphql_1.PickType)(mock_exam_question_feedback_entity_1.MockExamQuestionFeedback, ['content']) {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], CreateMockExamQuestionFeedbackInput.prototype, "questionId", void 0);
__decorate([
    (0, graphql_1.Field)(() => mock_exam_question_feedback_entity_1.QuestionFeedbackType, {
        defaultValue: mock_exam_question_feedback_entity_1.QuestionFeedbackType.PUBLIC,
    }),
    __metadata("design:type", String)
], CreateMockExamQuestionFeedbackInput.prototype, "type", void 0);
CreateMockExamQuestionFeedbackInput = __decorate([
    (0, graphql_1.InputType)()
], CreateMockExamQuestionFeedbackInput);
exports.CreateMockExamQuestionFeedbackInput = CreateMockExamQuestionFeedbackInput;
let CreateMockExamQuestionFeedbackOutput = class CreateMockExamQuestionFeedbackOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => mock_exam_question_feedback_entity_1.MockExamQuestionFeedback, { nullable: true }),
    __metadata("design:type", mock_exam_question_feedback_entity_1.MockExamQuestionFeedback)
], CreateMockExamQuestionFeedbackOutput.prototype, "feedback", void 0);
CreateMockExamQuestionFeedbackOutput = __decorate([
    (0, graphql_1.ObjectType)()
], CreateMockExamQuestionFeedbackOutput);
exports.CreateMockExamQuestionFeedbackOutput = CreateMockExamQuestionFeedbackOutput;
//# sourceMappingURL=createMockExamQuestionFeedback.dto.js.map