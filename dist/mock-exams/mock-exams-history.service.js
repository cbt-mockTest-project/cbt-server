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
exports.MockExamHistoryService = void 0;
const mock_exam_entity_1 = require("./entities/mock-exam.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mock_exam_history_1 = require("./entities/mock-exam-history");
let MockExamHistoryService = class MockExamHistoryService {
    constructor(mockExamHistory, mockExam) {
        this.mockExamHistory = mockExamHistory;
        this.mockExam = mockExam;
    }
    async createMockExamHistory(createMockExamHistoryInput, user) {
        try {
            const { examId } = createMockExamHistoryInput;
            const prevMockExam = await this.mockExamHistory.findOne({
                relations: { user: true, exam: true },
                where: { exam: { id: examId }, user: { id: user.id } },
            });
            if (prevMockExam) {
                await this.mockExamHistory.update(prevMockExam.id, {});
                return {
                    ok: true,
                };
            }
            await this.mockExamHistory.save(this.mockExamHistory.create({
                exam: { id: examId },
                user,
            }));
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '시험 기록에 실패했습니다.',
            };
        }
    }
    async readMyExamHistory(user) {
        try {
            const mockExamHistories = await this.mockExamHistory.find({
                where: { user: { id: user.id } },
                order: { updated_at: 'DESC' },
                relations: ['exam'],
            });
            const mockExams = mockExamHistories.map((mockExamHistory) => (Object.assign(Object.assign({}, mockExamHistory.exam), { updated_at: mockExamHistory.updated_at })));
            return { ok: true, mockExams };
        }
        catch (_a) {
            return {
                ok: false,
                error: '시험 기록을 불러오는데 실패했습니다.',
            };
        }
    }
};
MockExamHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mock_exam_history_1.MockExamHistory)),
    __param(1, (0, typeorm_1.InjectRepository)(mock_exam_entity_1.MockExam)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MockExamHistoryService);
exports.MockExamHistoryService = MockExamHistoryService;
//# sourceMappingURL=mock-exams-history.service.js.map