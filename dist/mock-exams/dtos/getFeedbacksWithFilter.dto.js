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
exports.GetFeedbacksWithFilterOutput = exports.GetFeedbacksWithFilterInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
const mock_exam_question_feedback_entity_1 = require("../entities/mock-exam-question-feedback.entity");
let GetFeedbacksWithFilterInput = class GetFeedbacksWithFilterInput {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], GetFeedbacksWithFilterInput.prototype, "examId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], GetFeedbacksWithFilterInput.prototype, "goodCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], GetFeedbacksWithFilterInput.prototype, "badCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => [mock_exam_question_feedback_entity_1.QuestionFeedbackType]),
    __metadata("design:type", Array)
], GetFeedbacksWithFilterInput.prototype, "types", void 0);
GetFeedbacksWithFilterInput = __decorate([
    (0, graphql_1.InputType)()
], GetFeedbacksWithFilterInput);
exports.GetFeedbacksWithFilterInput = GetFeedbacksWithFilterInput;
let GetFeedbacksWithFilterOutput = class GetFeedbacksWithFilterOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => [mock_exam_question_feedback_entity_1.MockExamQuestionFeedback], { defaultValue: [] }),
    __metadata("design:type", Array)
], GetFeedbacksWithFilterOutput.prototype, "feedbacks", void 0);
GetFeedbacksWithFilterOutput = __decorate([
    (0, graphql_1.ObjectType)()
], GetFeedbacksWithFilterOutput);
exports.GetFeedbacksWithFilterOutput = GetFeedbacksWithFilterOutput;
//# sourceMappingURL=getFeedbacksWithFilter.dto.js.map