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
exports.ReadMockExamQuestionsByMockExamIdOutput = exports.ReadMockExamQuestionsByMockExamIdInput = void 0;
const mock_exam_question_entity_1 = require("../entities/mock-exam-question.entity");
const output_dto_1 = require("../../common/dtos/output.dto");
const graphql_1 = require("@nestjs/graphql");
const mock_exam_question_state_entity_1 = require("../entities/mock-exam-question-state.entity");
let ReadMockExamQuestionsByMockExamIdInput = class ReadMockExamQuestionsByMockExamIdInput {
};
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], ReadMockExamQuestionsByMockExamIdInput.prototype, "isRandom", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], ReadMockExamQuestionsByMockExamIdInput.prototype, "bookmarked", void 0);
__decorate([
    (0, graphql_1.Field)(() => [mock_exam_question_state_entity_1.QuestionState], { nullable: true }),
    __metadata("design:type", Array)
], ReadMockExamQuestionsByMockExamIdInput.prototype, "states", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], ReadMockExamQuestionsByMockExamIdInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Number], { nullable: true }),
    __metadata("design:type", Array)
], ReadMockExamQuestionsByMockExamIdInput.prototype, "ids", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], ReadMockExamQuestionsByMockExamIdInput.prototype, "limit", void 0);
ReadMockExamQuestionsByMockExamIdInput = __decorate([
    (0, graphql_1.InputType)()
], ReadMockExamQuestionsByMockExamIdInput);
exports.ReadMockExamQuestionsByMockExamIdInput = ReadMockExamQuestionsByMockExamIdInput;
let ReadMockExamQuestionsByMockExamIdOutput = class ReadMockExamQuestionsByMockExamIdOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => [mock_exam_question_entity_1.MockExamQuestion]),
    __metadata("design:type", Array)
], ReadMockExamQuestionsByMockExamIdOutput.prototype, "questions", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], ReadMockExamQuestionsByMockExamIdOutput.prototype, "count", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ReadMockExamQuestionsByMockExamIdOutput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { defaultValue: '' }),
    __metadata("design:type", String)
], ReadMockExamQuestionsByMockExamIdOutput.prototype, "author", void 0);
ReadMockExamQuestionsByMockExamIdOutput = __decorate([
    (0, graphql_1.ObjectType)()
], ReadMockExamQuestionsByMockExamIdOutput);
exports.ReadMockExamQuestionsByMockExamIdOutput = ReadMockExamQuestionsByMockExamIdOutput;
//# sourceMappingURL=readMockExamQuestionsByMockExamId.dto.js.map