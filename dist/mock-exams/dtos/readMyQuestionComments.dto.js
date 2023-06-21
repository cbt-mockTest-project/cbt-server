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
exports.ReadMyQuestionCommentsOutput = exports.ReadMyQuestionCommentsInput = void 0;
const mock_exam_question_entity_1 = require("../entities/mock-exam-question.entity");
const output_dto_1 = require("../../common/dtos/output.dto");
const graphql_1 = require("@nestjs/graphql");
let ReadMyQuestionCommentsInput = class ReadMyQuestionCommentsInput {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], ReadMyQuestionCommentsInput.prototype, "examId", void 0);
ReadMyQuestionCommentsInput = __decorate([
    (0, graphql_1.InputType)()
], ReadMyQuestionCommentsInput);
exports.ReadMyQuestionCommentsInput = ReadMyQuestionCommentsInput;
let ReadMyQuestionCommentsOutput = class ReadMyQuestionCommentsOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => [mock_exam_question_entity_1.MockExamQuestion], { nullable: true }),
    __metadata("design:type", Array)
], ReadMyQuestionCommentsOutput.prototype, "questions", void 0);
ReadMyQuestionCommentsOutput = __decorate([
    (0, graphql_1.ObjectType)()
], ReadMyQuestionCommentsOutput);
exports.ReadMyQuestionCommentsOutput = ReadMyQuestionCommentsOutput;
//# sourceMappingURL=readMyQuestionComments.dto.js.map