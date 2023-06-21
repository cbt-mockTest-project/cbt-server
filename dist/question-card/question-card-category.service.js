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
exports.QuestionCardCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const question_card_category_1 = require("./entities/question-card-category");
let QuestionCardCategoryService = class QuestionCardCategoryService {
    constructor(questionCardCategory) {
        this.questionCardCategory = questionCardCategory;
    }
    async readMyQuestionCardCategories(user) {
        try {
            const categories = await this.questionCardCategory.find({
                where: {
                    user: { id: user.id },
                },
                order: {
                    created_at: 'DESC',
                },
            });
            if (categories.length === 0) {
                const newCategory = this.questionCardCategory.create({
                    name: '기본',
                    user,
                });
                await this.questionCardCategory.save(newCategory);
                return {
                    ok: true,
                    categories: [newCategory],
                };
            }
            return {
                ok: true,
                categories,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '데이터를 불러오지 못했습니다.',
            };
        }
    }
    async createQuestionCardCategory(createQuestionCardCategoryInput, user) {
        try {
            const newCategory = this.questionCardCategory.create(createQuestionCardCategoryInput);
            newCategory.user = user;
            const category = await this.questionCardCategory.save(newCategory);
            return {
                ok: true,
                category,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '카테고리 생성에 실패했습니다.',
            };
        }
    }
    async deleteQuestionCardCategory(user, deleteQuestionCardCategoryInput) {
        try {
            const { id } = deleteQuestionCardCategoryInput;
            const category = await this.questionCardCategory.findOne({
                relations: { user: true, questionCard: true },
                where: {
                    id,
                    user: {
                        id: user.id,
                    },
                },
            });
            if (!category) {
                return {
                    ok: false,
                    error: '카테고리가 존재하지 않습니다.',
                };
            }
            if (category.questionCard.length > 0) {
                return {
                    ok: false,
                    error: '카테고리에 속한 메모를 모두 삭제후 삭제해주세요.',
                };
            }
            await this.questionCardCategory.delete({ id });
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '카테고리 삭제에 실패했습니다.',
            };
        }
    }
    async updateQuestionCardCategory(user, updateQuestionCardCategoryInput) {
        try {
            const { id, name } = updateQuestionCardCategoryInput;
            let category = await this.questionCardCategory.findOne({
                relations: { user: true },
                where: {
                    id,
                    user: {
                        id: user.id,
                    },
                },
            });
            if (!category) {
                return {
                    ok: false,
                    error: '카테고리가 존재하지 않습니다.',
                };
            }
            category.name = name;
            category = await this.questionCardCategory.save(category);
            return {
                ok: true,
                category,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '카테고리 수정에 실패했습니다.',
            };
        }
    }
};
QuestionCardCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(question_card_category_1.QuestionCardCategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], QuestionCardCategoryService);
exports.QuestionCardCategoryService = QuestionCardCategoryService;
//# sourceMappingURL=question-card-category.service.js.map