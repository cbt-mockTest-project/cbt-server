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
exports.MockExamService = void 0;
const utils_1 = require("./../utils/utils");
const mock_exam_question_state_entity_1 = require("./entities/mock-exam-question-state.entity");
const mock_exam_category_entity_1 = require("./entities/mock-exam-category.entity");
const mock_exam_entity_1 = require("./entities/mock-exam.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let MockExamService = class MockExamService {
    constructor(mockExam, mockExamCategory, mockExamQuestionState) {
        this.mockExam = mockExam;
        this.mockExamCategory = mockExamCategory;
        this.mockExamQuestionState = mockExamQuestionState;
    }
    async createMockExam(createMockExamInput) {
        const { title, categoryName } = createMockExamInput;
        const exists = await this.mockExam.findOne({ where: { title } });
        if (exists) {
            return {
                ok: false,
                error: '이미 존재하는 시험입니다.',
            };
        }
        const mockExamCategory = await this.mockExamCategory.findOne({
            where: { name: categoryName },
        });
        if (!mockExamCategory) {
            return {
                ok: false,
                error: '존재하지 않는 카테고리입니다.',
            };
        }
        const newMockExam = this.mockExam.create({
            title,
            mockExamCategory,
            approved: false,
        });
        this.mockExam.save(newMockExam);
        return {
            ok: true,
        };
    }
    async editMockExam(editMockExamInput) {
        const { id, title } = editMockExamInput;
        const prevMockExam = await this.mockExam.findOne({
            where: { id },
        });
        if (!prevMockExam) {
            return {
                ok: false,
                error: '존재하지 않는 시험입니다.',
            };
        }
        if (title === prevMockExam.title) {
            return {
                ok: false,
                error: '변경 된 내용이 없습니다.',
            };
        }
        prevMockExam.title = title;
        await this.mockExam.save([prevMockExam]);
        return { ok: true };
    }
    async deleteMockExam(deleteMockExamInput) {
        const { id } = deleteMockExamInput;
        const prevMockExam = await this.mockExam.findOne({ where: { id } });
        if (!prevMockExam) {
            return {
                ok: false,
                error: '존재하지 않는 시험입니다.',
            };
        }
        await this.mockExam.delete({ id });
        return { ok: true };
    }
    async readAllMockExam(readAllMockExamsInput) {
        try {
            const { query, category } = readAllMockExamsInput;
            const mockExams = await this.mockExam.find({
                where: {
                    title: (0, typeorm_2.Raw)((title) => `${title} ILIKE '%${query}%'`),
                    mockExamCategory: {
                        name: (0, typeorm_2.Raw)((name) => `${name} ILIKE '%${category}%'`),
                    },
                },
                order: {
                    title: 'ASC',
                },
            });
            return { ok: true, mockExams };
        }
        catch (_a) {
            return {
                ok: false,
                error: '시험을 찾을 수 없습니다.',
            };
        }
    }
    async searchMockExam(searchMockExamInput) {
        try {
            const { query } = searchMockExamInput;
            const [mockExams, totalResults] = await this.mockExam.findAndCount({
                where: {
                    title: (0, typeorm_2.Raw)((title) => `${title} ILIKE '%${query}%'`),
                },
                relations: ['mockExamQuestion'],
            });
            return {
                ok: true,
                totalResults,
                mockExams,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '시험을 검색할 수  없습니다.',
            };
        }
    }
    async readMockExam(readMockExamInput) {
        try {
            const { id } = readMockExamInput;
            const mockExam = await this.mockExam.findOne({
                where: { id },
                relations: [
                    'mockExamQuestion',
                    'mockExamQuestion.mockExamQuestionFeedback',
                ],
                order: {
                    mockExamQuestion: {
                        number: 'ASC',
                    },
                },
            });
            const questionNumbers = mockExam.mockExamQuestion.map((data) => data.number);
            return {
                ok: true,
                mockExam,
                questionNumbers,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '시험을 찾을 수 없습니다.',
            };
        }
    }
    async readMockExamTitlesByCateory(readMockExamTitlesByCateoryInput) {
        try {
            const { name } = readMockExamTitlesByCateoryInput;
            const mockExamTitles = await this.mockExam.find({
                where: { mockExamCategory: { name } },
                select: ['title', 'id'],
            });
            if (!mockExamTitles) {
                return {
                    ok: false,
                    error: '해당 카테고리에 맞는 시험이 존재하지 않습니다.',
                };
            }
            return {
                titles: mockExamTitles,
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '타이틀을 찾을 수 없습니다.',
            };
        }
    }
    async findMyExamHistory(user, findMyExamHistoryInput) {
        try {
            const commonAndConditions = { user: { id: user.id } };
            const { categoryIds } = findMyExamHistoryInput;
            const where = categoryIds.length !== 0
                ? categoryIds.map((id) => (Object.assign(Object.assign({}, commonAndConditions), { exam: { mockExamCategory: { id } } })))
                : commonAndConditions;
            const res = await this.mockExamQuestionState.find({
                where,
                select: ['exam'],
                relations: {
                    exam: true,
                },
            });
            if (!res) {
                return {
                    ok: false,
                    error: '시험내역이 존재하지 않습니다.',
                };
            }
            const examsTitleAndId = (0, utils_1.deduplication)(res.map((el) => ({ id: el.exam.id, title: el.exam.title })));
            return {
                ok: true,
                titleAndId: examsTitleAndId,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '시험기록을 조회할 수 없습니다.',
            };
        }
    }
};
MockExamService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mock_exam_entity_1.MockExam)),
    __param(1, (0, typeorm_1.InjectRepository)(mock_exam_category_entity_1.MockExamCategory)),
    __param(2, (0, typeorm_1.InjectRepository)(mock_exam_question_state_entity_1.MockExamQuestionState)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MockExamService);
exports.MockExamService = MockExamService;
//# sourceMappingURL=mock-exams.service.js.map