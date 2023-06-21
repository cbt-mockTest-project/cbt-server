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
exports.MockExamQuestionMultipleChoice = exports.MockExamMultipleChoiceOption = void 0;
const mock_exam_question_entity_1 = require("./mock-exam-question.entity");
const core_entity_1 = require("./../../common/entities/core.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
let MockExamMultipleChoiceOption = class MockExamMultipleChoiceOption {
};
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], MockExamMultipleChoiceOption.prototype, "image", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], MockExamMultipleChoiceOption.prototype, "content", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], MockExamMultipleChoiceOption.prototype, "number", void 0);
MockExamMultipleChoiceOption = __decorate([
    (0, graphql_1.InputType)('MockExamQuestionMultipleChoiceOption', { isAbstract: true }),
    (0, graphql_1.ObjectType)()
], MockExamMultipleChoiceOption);
exports.MockExamMultipleChoiceOption = MockExamMultipleChoiceOption;
let MockExamQuestionMultipleChoice = class MockExamQuestionMultipleChoice extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ type: 'json', default: [] }),
    (0, graphql_1.Field)(() => [MockExamMultipleChoiceOption]),
    __metadata("design:type", Array)
], MockExamQuestionMultipleChoice.prototype, "options", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], MockExamQuestionMultipleChoice.prototype, "answer", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => mock_exam_question_entity_1.MockExamQuestion, (question) => question.multipleChoice, {
        onDelete: 'CASCADE',
    }),
    (0, graphql_1.Field)(() => mock_exam_question_entity_1.MockExamQuestion),
    __metadata("design:type", mock_exam_question_entity_1.MockExamQuestion)
], MockExamQuestionMultipleChoice.prototype, "question", void 0);
MockExamQuestionMultipleChoice = __decorate([
    (0, graphql_1.InputType)('MockExamQuestionMultipleChoice', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], MockExamQuestionMultipleChoice);
exports.MockExamQuestionMultipleChoice = MockExamQuestionMultipleChoice;
//# sourceMappingURL=mock-exam-question-multiple-choice.entity.js.map