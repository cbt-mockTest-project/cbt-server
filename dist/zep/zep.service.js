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
exports.ZepService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const mock_exam_question_entity_1 = require("../mock-exams/entities/mock-exam-question.entity");
const typeorm_2 = require("typeorm");
let ZepService = class ZepService {
    constructor(mockExamQuestion) {
        this.mockExamQuestion = mockExamQuestion;
    }
    async getRandomQuestion(categoryId) {
        try {
            const questions = await this.mockExamQuestion.find({
                where: {
                    mockExam: {
                        mockExamCategory: {
                            id: Number(categoryId),
                        },
                    },
                },
            });
            const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
            return {
                ok: true,
                question: randomQuestion,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '문제를 찾을 수 없습니다.',
            };
        }
    }
};
ZepService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mock_exam_question_entity_1.MockExamQuestion)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ZepService);
exports.ZepService = ZepService;
//# sourceMappingURL=zep.service.js.map