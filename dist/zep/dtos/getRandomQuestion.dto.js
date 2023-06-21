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
exports.GetRandomQuestionOutput = exports.GetRandomQuestionInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
const mock_exam_question_entity_1 = require("../../mock-exams/entities/mock-exam-question.entity");
let GetRandomQuestionInput = class GetRandomQuestionInput {
};
GetRandomQuestionInput = __decorate([
    (0, graphql_1.InputType)()
], GetRandomQuestionInput);
exports.GetRandomQuestionInput = GetRandomQuestionInput;
let GetRandomQuestionOutput = class GetRandomQuestionOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => mock_exam_question_entity_1.MockExamQuestion, { nullable: true }),
    __metadata("design:type", mock_exam_question_entity_1.MockExamQuestion)
], GetRandomQuestionOutput.prototype, "question", void 0);
GetRandomQuestionOutput = __decorate([
    (0, graphql_1.ObjectType)()
], GetRandomQuestionOutput);
exports.GetRandomQuestionOutput = GetRandomQuestionOutput;
//# sourceMappingURL=getRandomQuestion.dto.js.map