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
exports.MockExamQuestionState = exports.QuestionState = void 0;
const mock_exam_question_entity_1 = require("./mock-exam-question.entity");
const core_entity_1 = require("../../common/entities/core.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../../users/entities/user.entity");
const mock_exam_entity_1 = require("./mock-exam.entity");
var QuestionState;
(function (QuestionState) {
    QuestionState["ROW"] = "ROW";
    QuestionState["MIDDLE"] = "MIDDLE";
    QuestionState["HIGH"] = "HIGH";
    QuestionState["CORE"] = "CORE";
})(QuestionState = exports.QuestionState || (exports.QuestionState = {}));
(0, graphql_1.registerEnumType)(QuestionState, { name: 'QuestionState' });
let MockExamQuestionState = class MockExamQuestionState extends core_entity_1.CoreEntity {
};
__decorate([
    (0, graphql_1.Field)(() => QuestionState),
    (0, typeorm_1.Column)({ type: 'enum', enum: QuestionState, default: QuestionState.CORE }),
    (0, class_validator_1.IsEnum)(QuestionState),
    __metadata("design:type", String)
], MockExamQuestionState.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], MockExamQuestionState.prototype, "answer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mock_exam_question_entity_1.MockExamQuestion, (mockExamQuestion) => mockExamQuestion.state, { onDelete: 'CASCADE' }),
    (0, graphql_1.Field)(() => mock_exam_question_entity_1.MockExamQuestion),
    __metadata("design:type", mock_exam_question_entity_1.MockExamQuestion)
], MockExamQuestionState.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.mockExamQuestionState, {
        onDelete: 'CASCADE',
    }),
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], MockExamQuestionState.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mock_exam_entity_1.MockExam, (exam) => exam.mockExamQuestionState),
    (0, graphql_1.Field)(() => mock_exam_entity_1.MockExam),
    __metadata("design:type", mock_exam_entity_1.MockExam)
], MockExamQuestionState.prototype, "exam", void 0);
MockExamQuestionState = __decorate([
    (0, graphql_1.InputType)('MockExamQuestionStateInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], MockExamQuestionState);
exports.MockExamQuestionState = MockExamQuestionState;
//# sourceMappingURL=mock-exam-question-state.entity.js.map