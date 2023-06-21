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
exports.QuestionCardService = void 0;
const question_card_category_1 = require("./entities/question-card-category");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const question_card_entity_1 = require("./entities/question-card.entity");
const typeorm_2 = require("typeorm");
let QuestionCardService = class QuestionCardService {
    constructor(questionCard, questionCardCategory) {
        this.questionCard = questionCard;
        this.questionCardCategory = questionCardCategory;
    }
    async readQuestionCard(readQusetionCardInput) {
        try {
            const { id } = readQusetionCardInput;
            const questionCard = await this.questionCard.findOne({ where: { id } });
            if (!questionCard) {
                return {
                    ok: false,
                    error: 'QuestionCard not found',
                };
            }
            return {
                ok: true,
                questionCard,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '데이터를 불러오지 못했습니다.',
            };
        }
    }
    async readMyQuestionCards(readMyQuestionCardsInput, user) {
        try {
            const { categoryId } = readMyQuestionCardsInput;
            const questionCards = await this.questionCard.find({
                where: { category: { id: categoryId }, user: { id: user.id } },
                order: { created_at: 'DESC' },
            });
            if (!questionCards) {
                return {
                    ok: false,
                    error: 'QuestionCard not found',
                };
            }
            return {
                ok: true,
                questionCards,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '데이터를 불러오지 못했습니다.',
            };
        }
    }
    async createQuestionCard(user, createQuestionCardInput) {
        try {
            const { question, solution, categoryId } = createQuestionCardInput;
            const category = await this.questionCardCategory.findOne({
                where: { id: categoryId },
            });
            if (!category) {
                return {
                    ok: false,
                    error: 'Category not found',
                };
            }
            const questionCard = await this.questionCard.save(this.questionCard.create({
                question,
                solution,
                category,
                user,
            }));
            return {
                ok: true,
                questionCard,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '카드 생성에 실패했습니다.',
            };
        }
    }
    async updateQuestionCard(user, updateQuestionCardInput) {
        try {
            const { question, solution, questionId } = updateQuestionCardInput;
            const prevQuestionCard = await this.questionCard.findOne({
                relations: { user: true },
                where: { id: questionId, user: { id: user.id } },
            });
            if (!prevQuestionCard) {
                return {
                    ok: false,
                    error: 'QuestionCard not found',
                };
            }
            const questionCard = await this.questionCard.save({
                id: questionId,
                question: question || prevQuestionCard.question,
                solution: solution || prevQuestionCard.solution,
                user,
            });
            return {
                ok: true,
                questionCard,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '카드 수정에 실패했습니다.',
            };
        }
    }
    async deleteQuestionCards(deleteQuestionCardInput, user) {
        try {
            const { ids } = deleteQuestionCardInput;
            await this.questionCard.delete({
                id: (0, typeorm_2.In)(ids),
                user: { id: user.id },
            });
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '카드 삭제에 실패했습니다.',
            };
        }
    }
};
QuestionCardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(question_card_entity_1.QuestionCard)),
    __param(1, (0, typeorm_1.InjectRepository)(question_card_category_1.QuestionCardCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], QuestionCardService);
exports.QuestionCardService = QuestionCardService;
//# sourceMappingURL=question-card.service.js.map