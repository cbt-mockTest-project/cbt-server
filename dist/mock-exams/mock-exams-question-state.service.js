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
exports.MockExamQuestionStateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const utils_1 = require("../utils/utils");
const typeorm_2 = require("typeorm");
const mock_exam_question_state_entity_1 = require("./entities/mock-exam-question-state.entity");
const mock_exam_question_entity_1 = require("./entities/mock-exam-question.entity");
let MockExamQuestionStateService = class MockExamQuestionStateService {
    constructor(mockExamQuestionState, mockExamQuestion) {
        this.mockExamQuestionState = mockExamQuestionState;
        this.mockExamQuestion = mockExamQuestion;
    }
    async createOrUpdateMockExamQuestionState(user, createOrUpdateMockExamQuestionStateInput) {
        const { questionId, state } = createOrUpdateMockExamQuestionStateInput;
        const prevState = await this.mockExamQuestionState.findOne({
            where: {
                user: {
                    id: user.id,
                },
                question: {
                    id: questionId,
                },
            },
        });
        if (prevState) {
            if (prevState.state === state) {
                return {
                    ok: false,
                    error: '이전과 값이 동일합니다.',
                };
            }
            await this.mockExamQuestionState.update(prevState.id, { state });
            return {
                ok: true,
                message: 'update success',
                currentState: state,
            };
        }
        const question = await this.mockExamQuestion.findOne({
            where: {
                id: questionId,
            },
            relations: {
                mockExam: true,
            },
        });
        if (!question) {
            return {
                ok: false,
                error: '존재하지 않는 문제입니다.',
            };
        }
        const newState = this.mockExamQuestionState.create({
            question,
            exam: question.mockExam,
            state,
            user,
        });
        await this.mockExamQuestionState.save(newState);
        return {
            ok: true,
            message: 'create success',
            currentState: state,
        };
    }
    async readMyExamQuestionState(readMyExamQuestionState, user) {
        try {
            const { questionId } = readMyExamQuestionState;
            const coreState = this.mockExamQuestionState.create({
                state: mock_exam_question_state_entity_1.QuestionState.CORE,
            });
            if (!user) {
                return {
                    ok: true,
                    state: coreState,
                };
            }
            const state = await this.mockExamQuestionState.findOne({
                where: {
                    question: { id: questionId },
                    user: { id: user.id },
                },
            });
            if (!state) {
                return {
                    ok: true,
                    state: coreState,
                };
            }
            return {
                ok: true,
                state: state,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '상태를 읽어올 수 없습니다.',
            };
        }
    }
    async resetMyExamQuestionState(resetMyExamQuestionStateInput, user) {
        try {
            const { examId, questionIds } = resetMyExamQuestionStateInput;
            let states;
            if (questionIds) {
                const where = questionIds.map((id) => ({ question: { id }, user: { id: user.id } }));
                states = await this.mockExamQuestionState.find({
                    where,
                });
            }
            else if (examId) {
                states = await this.mockExamQuestionState.find({
                    where: {
                        user: { id: user.id },
                        exam: { id: examId },
                    },
                });
            }
            if (!states) {
                return {
                    ok: false,
                    error: '존재하지 않는 시험입니다.',
                };
            }
            if (states.length === 0) {
                return {
                    ok: false,
                    error: '체크된 성취도가 없습니다.',
                };
            }
            const newStates = this.mockExamQuestionState.create(states.map((el) => (Object.assign(Object.assign({}, el), { state: mock_exam_question_state_entity_1.QuestionState.CORE }))));
            await this.mockExamQuestionState.save(newStates);
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '성취도를 초기화 할 수 없습니다.',
            };
        }
    }
    async readExamTitleAndIdByQuestionState(user) {
        try {
            const questionStates = await this.mockExamQuestionState.find({
                where: {
                    state: (0, typeorm_2.Not)(mock_exam_question_state_entity_1.QuestionState.CORE),
                    user: {
                        id: user.id,
                    },
                },
                relations: {
                    exam: true,
                },
            });
            const titleAndId = (0, utils_1.deduplication)(questionStates.map((state) => {
                const { title, id } = state.exam;
                return { title, id };
            }));
            return { ok: true, titleAndId };
        }
        catch (e) {
            return { ok: false, error: '시험카테고리를 불러올 수 없습니다.' };
        }
    }
    async updateQuestionStatesToCore(user) {
        const questions = await this.mockExamQuestion.find();
        const questionIds = questions.map((q) => q.id);
        const existingQuestionStates = await this.mockExamQuestionState.find({
            relations: { question: true, exam: true },
            where: {
                user: { id: user.id },
                question: { id: (0, typeorm_2.In)(questionIds) },
            },
        });
        const existingQuestionStateMap = new Map(existingQuestionStates.map((qs) => [qs.question.id, qs]));
        const newQuestionStates = questions
            .filter((question) => !existingQuestionStateMap.has(question.id))
            .map((question) => {
            return this.mockExamQuestionState.create({
                question,
                exam: question.mockExam,
                state: mock_exam_question_state_entity_1.QuestionState.CORE,
                user,
            });
        });
        if (newQuestionStates.length > 0) {
            await this.mockExamQuestionState.save(newQuestionStates);
        }
        return {
            ok: true,
        };
    }
};
MockExamQuestionStateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mock_exam_question_state_entity_1.MockExamQuestionState)),
    __param(1, (0, typeorm_1.InjectRepository)(mock_exam_question_entity_1.MockExamQuestion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MockExamQuestionStateService);
exports.MockExamQuestionStateService = MockExamQuestionStateService;
//# sourceMappingURL=mock-exams-question-state.service.js.map