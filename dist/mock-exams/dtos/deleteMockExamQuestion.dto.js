"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMockExamQuestionOutput = exports.DeleteMockExamQuestionInput = void 0;
const output_dto_1 = require("./../../common/dtos/output.dto");
const mock_exam_question_entity_1 = require("./../entities/mock-exam-question.entity");
const graphql_1 = require("@nestjs/graphql");
let DeleteMockExamQuestionInput = class DeleteMockExamQuestionInput extends (0, graphql_1.PickType)(mock_exam_question_entity_1.MockExamQuestion, [
    'id',
]) {
};
DeleteMockExamQuestionInput = __decorate([
    (0, graphql_1.InputType)()
], DeleteMockExamQuestionInput);
exports.DeleteMockExamQuestionInput = DeleteMockExamQuestionInput;
let DeleteMockExamQuestionOutput = class DeleteMockExamQuestionOutput extends output_dto_1.CoreOutput {
};
DeleteMockExamQuestionOutput = __decorate([
    (0, graphql_1.ObjectType)()
], DeleteMockExamQuestionOutput);
exports.DeleteMockExamQuestionOutput = DeleteMockExamQuestionOutput;
//# sourceMappingURL=deleteMockExamQuestion.dto.js.map