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
exports.MockExamQuestionService = void 0;
const mock_exam_question_state_entity_1 = require("./entities/mock-exam-question-state.entity");
const mock_exam_entity_1 = require("./entities/mock-exam.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mock_exam_question_entity_1 = require("./entities/mock-exam-question.entity");
const utils_1 = require("../utils/utils");
let MockExamQuestionService = class MockExamQuestionService {
    constructor(mockExamQuestion, mockExam, mockExamQuestionState) {
        this.mockExamQuestion = mockExamQuestion;
        this.mockExam = mockExam;
        this.mockExamQuestionState = mockExamQuestionState;
    }
    async createMockExamQuestion(createMockExamQuestionInput) {
        try {
            const { question, question_img, solution, solution_img, mockExamId, number, } = createMockExamQuestionInput;
            const mockExam = await this.mockExam.findOne({
                where: { id: mockExamId },
            });
            const questions = await this.mockExamQuestion.find({
                where: {
                    mockExam: {
                        id: mockExamId,
                    },
                },
            });
            const questionNumbers = questions.map((question) => question.number);
            if (questionNumbers.includes(number)) {
                return {
                    ok: false,
                    error: '이미 존재하는 문제 번호입니다',
                };
            }
            if (!mockExam) {
                return {
                    ok: false,
                    error: '존재하지 않는 시험입니다.',
                };
            }
            const newExamQuestion = this.mockExamQuestion.create({
                question,
                question_img,
                solution,
                solution_img,
                mockExam,
                approved: false,
                number,
            });
            await this.mockExamQuestion.save(newExamQuestion);
            return { ok: true };
        }
        catch (_a) {
            return { ok: false, error: '문제를 만들 수 없습니다' };
        }
    }
    async updateApprovedStateOfMockExamQuestion(updateApprovedStateOfMockExamQuestionInput) {
        const { questionId } = updateApprovedStateOfMockExamQuestionInput;
        const question = await this.mockExamQuestion.findOne({
            where: {
                id: questionId,
            },
        });
        if (!question) {
            return {
                ok: false,
                error: '존재하지 않는 문제입니다.',
            };
        }
        if (question.approved) {
            await this.mockExamQuestion.update(questionId, { approved: false });
        }
        else {
            await this.mockExamQuestion.update(questionId, { approved: true });
        }
        return {
            ok: true,
            currentApprovedState: false,
            questionId,
        };
    }
    async readMockExamQuestion(readMockExamQuestionInput, userId) {
        const { questionId, examId } = readMockExamQuestionInput;
        const where = examId
            ? { id: questionId, mockExam: { id: examId } }
            : { id: questionId };
        const question = await this.mockExamQuestion.findOne({
            where,
            relations: { mockExam: true },
        });
        if (!question) {
            return {
                ok: false,
                error: '존재하지 않는 문제입니다.',
            };
        }
        let questionState;
        if (userId) {
            questionState = await this.mockExamQuestionState.findOne({
                where: {
                    question: { id: questionId },
                    user: { id: userId },
                },
                relations: ['question', 'user'],
            });
        }
        if (questionState) {
            return {
                ok: true,
                mockExamQusetion: question,
                state: questionState.state,
            };
        }
        return {
            ok: true,
            mockExamQusetion: question,
        };
    }
    async editMockExamQuestion(editMockExamQuestionInput) {
        try {
            const { id, question, question_img, solution, solution_img } = editMockExamQuestionInput;
            const prevMockExamQuestion = await this.mockExamQuestion.findOne({
                where: { id },
            });
            if (!prevMockExamQuestion) {
                return {
                    ok: false,
                    error: '존재하지 않는 문제입니다.',
                };
            }
            await this.mockExamQuestion.update(id, {
                question,
                question_img,
                solution,
                solution_img,
            });
            return {
                ok: true,
            };
        }
        catch (e) {
            console.log(e);
            return {
                ok: false,
                error: '문제를 수정할 수 없습니다.',
            };
        }
    }
    async deleteMockExamQuestion(deleteMockExamQuestionInput) {
        try {
            const { id } = deleteMockExamQuestionInput;
            const mockExamQuestion = await this.mockExamQuestion.findOne({
                where: { id },
            });
            if (!mockExamQuestion) {
                return {
                    ok: false,
                    error: '존재하지 않는 문제입니다.',
                };
            }
            await this.mockExamQuestion.delete({ id });
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '문제를 삭제할 수 없습니다.',
            };
        }
    }
    async readAllMockExamQuestion() {
        try {
            const mockExamQuestions = await this.mockExamQuestion.find({
                relations: ['mockExamQuestionFeedback'],
            });
            return {
                ok: true,
                mockExamQuestions,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '시험문제를 찾을 수 없습니다.',
            };
        }
    }
    async readMockExamQuestionsByMockExamId(readMockExamQuestionsByMockExamIdInput, user) {
        try {
            const { id, isRandom } = readMockExamQuestionsByMockExamIdInput;
            let [questions, count] = await this.mockExamQuestion.findAndCount({
                where: { mockExam: { id } },
                order: { number: 'ASC' },
                relations: { state: { user: true, exam: true } },
            });
            questions = questions.map((question) => {
                const filteredState = question.state.filter((state) => user && state.user.id === user.id);
                return Object.assign(Object.assign({}, question), { state: filteredState });
            });
            if (isRandom) {
                questions = (0, utils_1.shuffleArray)(questions);
            }
            return {
                ok: true,
                questions,
                count,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '문제를 찾을 수 없습니다.',
            };
        }
    }
    async readMockExamQuestionNumbers(readMockExamQuestionNumbersInput) {
        const { mockExamId } = readMockExamQuestionNumbersInput;
        const mockExam = await this.mockExam.find({
            where: {
                id: mockExamId,
            },
            relations: {
                mockExamQuestion: true,
            },
            select: {
                mockExamQuestion: {
                    number: true,
                },
            },
            order: {
                mockExamQuestion: {
                    number: 'ASC',
                },
            },
        });
        if (!mockExam) {
            return {
                ok: false,
                error: '존재하지 않는 시험입니다.',
            };
        }
        const questionNumbers = mockExam[0].mockExamQuestion.map((data) => data.number);
        return {
            ok: true,
            questionNumbers,
        };
    }
    async readMockExamQuestionsByState(user, readMockExamQuestionsByStateInput) {
        const { states, examId } = readMockExamQuestionsByStateInput;
        const commonAndConditions = {
            user: {
                id: user.id,
            },
            question: {
                mockExam: { id: examId },
            },
        };
        const where = states.map((state) => (Object.assign(Object.assign({}, commonAndConditions), { state })));
        const mockExamQuestionStates = await this.mockExamQuestionState.find({
            where,
            relations: {
                question: {
                    state: true,
                },
            },
            select: ['question'],
        });
        const mockExamQusetions = mockExamQuestionStates
            .map((state) => state.question)
            .sort((a, b) => a.number - b.number);
        return {
            ok: true,
            mockExamQusetions,
        };
    }
};
MockExamQuestionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mock_exam_question_entity_1.MockExamQuestion)),
    __param(1, (0, typeorm_1.InjectRepository)(mock_exam_entity_1.MockExam)),
    __param(2, (0, typeorm_1.InjectRepository)(mock_exam_question_state_entity_1.MockExamQuestionState)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MockExamQuestionService);
exports.MockExamQuestionService = MockExamQuestionService;
//# sourceMappingURL=mock-exams-question.service.js.map