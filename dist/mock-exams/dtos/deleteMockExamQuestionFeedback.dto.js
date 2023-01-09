"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMockExamQuestionFeedbackOutput = exports.DeleteMockExamQuestionFeedbackInput = void 0;
const mock_exam_question_feedback_entity_1 = require("./../entities/mock-exam-question-feedback.entity");
const output_dto_1 = require("./../../common/dtos/output.dto");
const graphql_1 = require("@nestjs/graphql");
let DeleteMockExamQuestionFeedbackInput = class DeleteMockExamQuestionFeedbackInput extends (0, graphql_1.PickType)(mock_exam_question_feedback_entity_1.MockExamQuestionFeedback, ['id']) {
};
DeleteMockExamQuestionFeedbackInput = __decorate([
    (0, graphql_1.InputType)()
], DeleteMockExamQuestionFeedbackInput);
exports.DeleteMockExamQuestionFeedbackInput = DeleteMockExamQuestionFeedbackInput;
let DeleteMockExamQuestionFeedbackOutput = class DeleteMockExamQuestionFeedbackOutput extends output_dto_1.CoreOutput {
};
DeleteMockExamQuestionFeedbackOutput = __decorate([
    (0, graphql_1.ObjectType)()
], DeleteMockExamQuestionFeedbackOutput);
exports.DeleteMockExamQuestionFeedbackOutput = DeleteMockExamQuestionFeedbackOutput;
//# sourceMappingURL=deleteMockExamQuestionFeedback.dto.js.map