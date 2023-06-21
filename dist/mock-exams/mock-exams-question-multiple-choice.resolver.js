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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockExamQuestionMultipleChoiceResolver = void 0;
const createMockExamQuestionMultipleChoice_dto_1 = require("./dtos/createMockExamQuestionMultipleChoice.dto");
const graphql_1 = require("@nestjs/graphql");
const mock_exam_question_multiple_choice_entity_1 = require("./entities/mock-exam-question-multiple-choice.entity");
const mock_exams_question_multiple_choice_service_1 = require("./mock-exams-question-multiple-choice.service");
const role_decorators_1 = require("../auth/role.decorators");
let MockExamQuestionMultipleChoiceResolver = class MockExamQuestionMultipleChoiceResolver {
    constructor(mockExamQuestionMultipleChoiceService) {
        this.mockExamQuestionMultipleChoiceService = mockExamQuestionMultipleChoiceService;
    }
    async createMutipleChoice(createMockExamQuestionMultipleChoiceInput) {
        return this.mockExamQuestionMultipleChoiceService.createMutipleChoice(createMockExamQuestionMultipleChoiceInput);
    }
};
__decorate([
    (0, role_decorators_1.Role)(['ADMIN']),
    (0, graphql_1.Mutation)(() => createMockExamQuestionMultipleChoice_dto_1.CreateMockExamQuestionMultipleChoiceOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createMockExamQuestionMultipleChoice_dto_1.CreateMockExamQuestionMultipleChoiceInput]),
    __metadata("design:returntype", Promise)
], MockExamQuestionMultipleChoiceResolver.prototype, "createMutipleChoice", null);
MockExamQuestionMultipleChoiceResolver = __decorate([
    (0, graphql_1.Resolver)(() => mock_exam_question_multiple_choice_entity_1.MockExamQuestionMultipleChoice),
    __metadata("design:paramtypes", [mock_exams_question_multiple_choice_service_1.MockExamQuestionMultipleChoiceService])
], MockExamQuestionMultipleChoiceResolver);
exports.MockExamQuestionMultipleChoiceResolver = MockExamQuestionMultipleChoiceResolver;
//# sourceMappingURL=mock-exams-question-multiple-choice.resolver.js.map