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
exports.ReadMockExamQuestionNumbersOutput = exports.ReadMockExamQuestionNumbersInput = exports.QuestionNumber = void 0;
const output_dto_1 = require("./../../common/dtos/output.dto");
const graphql_1 = require("@nestjs/graphql");
const mock_exam_entity_1 = require("../entities/mock-exam.entity");
let QuestionNumber = class QuestionNumber {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], QuestionNumber.prototype, "questionNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], QuestionNumber.prototype, "questionId", void 0);
QuestionNumber = __decorate([
    (0, graphql_1.ObjectType)()
], QuestionNumber);
exports.QuestionNumber = QuestionNumber;
let ReadMockExamQuestionNumbersInput = class ReadMockExamQuestionNumbersInput {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], ReadMockExamQuestionNumbersInput.prototype, "mockExamId", void 0);
ReadMockExamQuestionNumbersInput = __decorate([
    (0, graphql_1.InputType)()
], ReadMockExamQuestionNumbersInput);
exports.ReadMockExamQuestionNumbersInput = ReadMockExamQuestionNumbersInput;
let ReadMockExamQuestionNumbersOutput = class ReadMockExamQuestionNumbersOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => [QuestionNumber]),
    __metadata("design:type", Array)
], ReadMockExamQuestionNumbersOutput.prototype, "questionNumbers", void 0);
__decorate([
    (0, graphql_1.Field)(() => mock_exam_entity_1.ExamStatus, { nullable: true }),
    __metadata("design:type", String)
], ReadMockExamQuestionNumbersOutput.prototype, "examStatus", void 0);
ReadMockExamQuestionNumbersOutput = __decorate([
    (0, graphql_1.ObjectType)()
], ReadMockExamQuestionNumbersOutput);
exports.ReadMockExamQuestionNumbersOutput = ReadMockExamQuestionNumbersOutput;
//# sourceMappingURL=readMockExamQuestionNumbers.dto.js.map