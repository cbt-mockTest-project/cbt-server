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
exports.CreateOrUpdateMockExamQuestionStateOutput = exports.CreateOrUpdateMockExamQuestionStateInput = void 0;
const output_dto_1 = require("./../../common/dtos/output.dto");
const mock_exam_question_state_entity_1 = require("./../entities/mock-exam-question-state.entity");
const graphql_1 = require("@nestjs/graphql");
let CreateOrUpdateMockExamQuestionStateInput = class CreateOrUpdateMockExamQuestionStateInput extends (0, graphql_1.PickType)(mock_exam_question_state_entity_1.MockExamQuestionState, ['state']) {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], CreateOrUpdateMockExamQuestionStateInput.prototype, "questionId", void 0);
CreateOrUpdateMockExamQuestionStateInput = __decorate([
    (0, graphql_1.InputType)()
], CreateOrUpdateMockExamQuestionStateInput);
exports.CreateOrUpdateMockExamQuestionStateInput = CreateOrUpdateMockExamQuestionStateInput;
let CreateOrUpdateMockExamQuestionStateOutput = class CreateOrUpdateMockExamQuestionStateOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreateOrUpdateMockExamQuestionStateOutput.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)(() => mock_exam_question_state_entity_1.QuestionState, { nullable: true }),
    __metadata("design:type", String)
], CreateOrUpdateMockExamQuestionStateOutput.prototype, "currentState", void 0);
CreateOrUpdateMockExamQuestionStateOutput = __decorate([
    (0, graphql_1.ObjectType)()
], CreateOrUpdateMockExamQuestionStateOutput);
exports.CreateOrUpdateMockExamQuestionStateOutput = CreateOrUpdateMockExamQuestionStateOutput;
//# sourceMappingURL=createOrUpdateMockExamQuestionState.dto.js.map