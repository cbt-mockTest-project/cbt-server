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
exports.MockExamCategoryService = void 0;
const user_entity_1 = require("../users/entities/user.entity");
const mock_exam_category_entity_1 = require("./entities/mock-exam-category.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let MockExamCategoryService = class MockExamCategoryService {
    constructor(mockExamCategories, examCategoryRoles) {
        this.mockExamCategories = mockExamCategories;
        this.examCategoryRoles = examCategoryRoles;
    }
    async createMockExamCategory(user, createMockExamCategoryInput) {
        try {
            const { name } = createMockExamCategoryInput;
            const exists = await this.mockExamCategories.findOne({
                where: { name },
            });
            if (exists) {
                return {
                    ok: false,
                    error: '이미 존재하는 카테고리 입니다.',
                };
            }
            const newCategory = this.mockExamCategories.create({
                name: createMockExamCategoryInput.name,
                user,
                approved: false,
            });
            const category = await this.mockExamCategories.save(newCategory);
            return {
                ok: true,
                category,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '카테고리를 생성할 수 없습니다.',
            };
        }
    }
    async deleteMockExamCategory(user, deleteMockExamCategoryInput) {
        try {
            const { id } = deleteMockExamCategoryInput;
            const category = await this.mockExamCategories.findOne({
                where: { id },
                relations: { user: true },
            });
            if (!category) {
                return {
                    ok: false,
                    error: '카테고리가 존재하지 않습니다.',
                };
            }
            if (category.approved) {
                return {
                    ok: false,
                    error: '승인된 카테고리는 삭제할 수 없습니다.',
                };
            }
            if (user.id !== category.user.id) {
                return {
                    ok: false,
                    error: '권한이 없습니다.',
                };
            }
            await this.mockExamCategories.delete({
                id,
            });
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '카테고리를 삭제할 수 없습니다.',
            };
        }
    }
    async editMockExamCategory(user, editMockExamCategoryInput) {
        const { id, name } = editMockExamCategoryInput;
        const prevCategory = await this.mockExamCategories.findOne({
            where: { id },
            relations: { user: true },
        });
        if (!prevCategory) {
            return {
                ok: false,
                error: '존재하지 않는 카테고리입니다.',
            };
        }
        if (prevCategory.approved) {
            return {
                ok: false,
                error: '승인된 카테고리는 수정할 수 없습니다.',
            };
        }
        if (user.id !== prevCategory.user.id) {
            return {
                ok: false,
                error: '권한이 없습니다.',
            };
        }
        if (prevCategory.name === name) {
            return {
                ok: false,
                error: '현재와 동일한 카테고리 이름입니다.',
            };
        }
        await this.mockExamCategories.save([editMockExamCategoryInput]);
        return {
            ok: true,
        };
    }
    async readAllMockExamCategories(readAllMockExamCategoriesInput) {
        try {
            let type = mock_exam_category_entity_1.MockExamCategoryTypes.practical;
            if (readAllMockExamCategoriesInput) {
                type = readAllMockExamCategoriesInput.type;
            }
            const categories = await this.mockExamCategories.find({
                where: {
                    type,
                    approved: true,
                    partner: (readAllMockExamCategoriesInput === null || readAllMockExamCategoriesInput === void 0 ? void 0 : readAllMockExamCategoriesInput.partnerId)
                        ? {
                            id: readAllMockExamCategoriesInput.partnerId,
                        }
                        : (0, typeorm_2.IsNull)(),
                },
                relations: {
                    user: true,
                    roles: true,
                    partner: true,
                },
                order: {
                    order: 'ASC',
                },
            });
            return {
                ok: true,
                categories,
            };
        }
        catch (e) {
            console.log(e);
            return {
                ok: false,
                error: '카테고리를 찾을 수 없습니다.',
            };
        }
    }
    async readMyMockExamCategories(user) {
        try {
            let categories = [];
            if (user.role === user_entity_1.UserRole.ADMIN) {
                categories = await this.mockExamCategories
                    .createQueryBuilder('mockExamCategory')
                    .getMany();
            }
            else {
                categories = await this.mockExamCategories
                    .createQueryBuilder('mockExamCategory')
                    .leftJoinAndSelect('mockExamCategory.examCoAuthor', 'examCoAuthor')
                    .orWhere('mockExamCategory.user.id = :userId', { userId: user.id })
                    .orWhere('examCoAuthor.user.id = :examCoAuthorId', {
                    examCoAuthorId: user.id,
                })
                    .getMany();
            }
            return {
                ok: true,
                categories,
            };
        }
        catch (e) {
            console.log(e);
            return {
                ok: false,
                error: '카테고리를 찾을 수 없습니다.',
            };
        }
    }
};
MockExamCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mock_exam_category_entity_1.MockExamCategory)),
    __param(1, (0, typeorm_1.InjectRepository)(mock_exam_category_entity_1.ExamCategoryRole)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MockExamCategoryService);
exports.MockExamCategoryService = MockExamCategoryService;
//# sourceMappingURL=mock-exams-category.service.js.map