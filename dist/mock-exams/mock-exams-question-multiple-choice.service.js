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
exports.MockExamQuestionMultipleChoiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mock_exam_question_entity_1 = require("./entities/mock-exam-question.entity");
const mock_exam_question_multiple_choice_entity_1 = require("./entities/mock-exam-question-multiple-choice.entity");
let MockExamQuestionMultipleChoiceService = class MockExamQuestionMultipleChoiceService {
    constructor(mockExamQuestionMultipleChoice, mockExamQuestion) {
        this.mockExamQuestionMultipleChoice = mockExamQuestionMultipleChoice;
        this.mockExamQuestion = mockExamQuestion;
    }
    async createMutipleChoice(createMockExamQuestionMultipleChoiceInput) {
        try {
            const { answer, options, questionId } = createMockExamQuestionMultipleChoiceInput;
            const prevQuestion = await this.mockExamQuestion.findOne({
                where: { id: questionId },
            });
            if (!prevQuestion) {
                return {
                    ok: false,
                    error: '존재하지 않는 문제입니다.',
                };
            }
            const multipleChoice = this.mockExamQuestionMultipleChoice.create({
                answer,
                options,
                question: prevQuestion,
            });
            await this.mockExamQuestionMultipleChoice.save(multipleChoice);
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '객관식 문항 생성에 실패했습니다.',
            };
        }
    }
};
MockExamQuestionMultipleChoiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mock_exam_question_multiple_choice_entity_1.MockExamQuestionMultipleChoice)),
    __param(1, (0, typeorm_1.InjectRepository)(mock_exam_question_entity_1.MockExamQuestion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MockExamQuestionMultipleChoiceService);
exports.MockExamQuestionMultipleChoiceService = MockExamQuestionMultipleChoiceService;
//# sourceMappingURL=mock-exams-question-multiple-choice.service.js.map