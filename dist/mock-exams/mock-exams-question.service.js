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
const exam_co_author_entity_1 = require("./../exam-co-author/entities/exam-co-author.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const mock_exam_question_bookmark_entity_1 = require("./entities/mock-exam-question-bookmark.entity");
const utils_1 = require("../utils/utils");
const typeorm_2 = require("typeorm");
const mock_exam_question_comment_entity_1 = require("./entities/mock-exam-question-comment.entity");
const mock_exam_question_feedback_recommendation_entity_1 = require("./entities/mock-exam-question-feedback-recommendation.entity");
const mock_exam_question_feedback_entity_1 = require("./entities/mock-exam-question-feedback.entity");
const mock_exam_question_state_entity_1 = require("./entities/mock-exam-question-state.entity");
const mock_exam_question_entity_1 = require("./entities/mock-exam-question.entity");
const mock_exam_entity_1 = require("./entities/mock-exam.entity");
let MockExamQuestionService = class MockExamQuestionService {
    constructor(mockExamQuestion, mockExam, mockExamQuestionState, mockExamQuestionBookmark, mockExamQuestionFeedback, mockExamQuestionComment, examCoAuthor) {
        this.mockExamQuestion = mockExamQuestion;
        this.mockExam = mockExam;
        this.mockExamQuestionState = mockExamQuestionState;
        this.mockExamQuestionBookmark = mockExamQuestionBookmark;
        this.mockExamQuestionFeedback = mockExamQuestionFeedback;
        this.mockExamQuestionComment = mockExamQuestionComment;
        this.examCoAuthor = examCoAuthor;
    }
    async createMockExamQuestion(user, createMockExamQuestionInput) {
        try {
            const { question, question_img, solution, solution_img, mockExamId, number, } = createMockExamQuestionInput;
            const mockExam = await this.mockExam.findOne({
                relations: { user: true },
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
            const coAuthor = await this.examCoAuthor.findOne({
                where: {
                    user: {
                        id: user.id,
                    },
                    exam: {
                        id: mockExamId,
                    },
                },
            });
            const isCoAuthor = coAuthor ? true : false;
            const isOwner = mockExam.user.id === user.id || isCoAuthor;
            if (!isOwner) {
                return {
                    ok: false,
                    error: '권한이 없습니다.',
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
                user,
            });
            const savedQestion = await this.mockExamQuestion.save(newExamQuestion);
            return { ok: true, questionId: savedQestion.id };
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
    async readMockExamQuestion(readMockExamQuestionInput, user) {
        try {
            const { questionId, examId } = readMockExamQuestionInput;
            const where = examId
                ? {
                    id: questionId,
                    mockExam: { id: examId },
                }
                : {
                    id: questionId,
                };
            let question = await this.mockExamQuestion.findOne({
                where,
                relations: {
                    mockExam: true,
                    mockExamQuestionComment: { user: true },
                    mockExamQuestionBookmark: user ? { user: true } : false,
                    mockExamQuestionFeedback: {
                        user: true,
                        recommendation: { user: true },
                        mockExamQuestion: true,
                    },
                    user: true,
                },
                order: {
                    mockExamQuestionFeedback: {
                        type: 'ASC',
                    },
                },
            });
            let isCoAuthor = false;
            if (user) {
                const examCoAuthor = await this.examCoAuthor.findOne({
                    where: {
                        exam: {
                            id: question.mockExam.id,
                        },
                        user: {
                            id: user && user.id,
                        },
                    },
                });
                if (examCoAuthor) {
                    isCoAuthor = true;
                }
            }
            if (!question) {
                return {
                    ok: false,
                    error: '존재하지 않는 문제입니다.',
                };
            }
            question.mockExamQuestionFeedback = question.mockExamQuestionFeedback
                .filter((feedback) => feedback.mockExamQuestion.id === question.id &&
                (feedback.type !== mock_exam_question_feedback_entity_1.QuestionFeedbackType.PRIVATE ||
                    (feedback.type === mock_exam_question_feedback_entity_1.QuestionFeedbackType.PRIVATE &&
                        feedback.user.id === (user === null || user === void 0 ? void 0 : user.id))))
                .map((feedback) => {
                const goodCount = feedback.recommendation.filter((recommendation) => recommendation.type === mock_exam_question_feedback_recommendation_entity_1.QuestionFeedbackRecommendationType.GOOD).length;
                const badCount = feedback.recommendation.filter((recommendation) => recommendation.type === mock_exam_question_feedback_recommendation_entity_1.QuestionFeedbackRecommendationType.BAD).length;
                const myRecommedationStatus = {
                    isGood: false,
                    isBad: false,
                };
                feedback.recommendation.forEach((recommendation) => {
                    if (recommendation.user.id === (user === null || user === void 0 ? void 0 : user.id)) {
                        if (recommendation.type === mock_exam_question_feedback_recommendation_entity_1.QuestionFeedbackRecommendationType.GOOD) {
                            myRecommedationStatus.isGood = true;
                        }
                        if (recommendation.type === mock_exam_question_feedback_recommendation_entity_1.QuestionFeedbackRecommendationType.BAD) {
                            myRecommedationStatus.isBad = true;
                        }
                    }
                });
                const recommendationCount = {
                    good: goodCount,
                    bad: badCount,
                };
                return Object.assign(Object.assign({}, feedback), { recommendationCount,
                    myRecommedationStatus });
            })
                .sort((a, b) => b.recommendationCount.good - a.recommendationCount.good ||
                a.recommendationCount.bad - b.recommendationCount.bad);
            if (user) {
                const mockExamQuestionBookmark = question.mockExamQuestionBookmark.filter((bookmark) => user.id === bookmark.user.id);
                question = Object.assign(Object.assign({}, question), { mockExamQuestionBookmark });
            }
            else {
                question = Object.assign(Object.assign({}, question), { mockExamQuestionBookmark: [] });
            }
            return {
                ok: true,
                mockExamQusetion: question,
                isCoAuthor,
            };
        }
        catch (e) {
            console.log(e);
            return {
                ok: false,
                error: '문제를 가져오는데 실패했습니다.',
            };
        }
    }
    async editMockExamQuestion(user, editMockExamQuestionInput) {
        try {
            const { id, question, question_img, solution, solution_img } = editMockExamQuestionInput;
            const prevMockExamQuestion = await this.mockExamQuestion.findOne({
                where: { id },
                relations: { user: true, mockExam: true },
            });
            if (!prevMockExamQuestion) {
                return {
                    ok: false,
                    error: '존재하지 않는 문제입니다.',
                };
            }
            const coAuthor = await this.examCoAuthor.findOne({
                where: {
                    user: {
                        id: user.id,
                    },
                    exam: {
                        id: prevMockExamQuestion.mockExam.id,
                    },
                },
            });
            const isCoAuthor = coAuthor ? true : false;
            const isOwner = prevMockExamQuestion.user.id === user.id || isCoAuthor;
            if (!isOwner) {
                return {
                    ok: false,
                    error: '권한이 없습니다.',
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
        catch (_a) {
            return {
                ok: false,
                error: '문제를 수정할 수 없습니다.',
            };
        }
    }
    async deleteMockExamQuestion(user, deleteMockExamQuestionInput) {
        try {
            const { id } = deleteMockExamQuestionInput;
            const mockExamQuestion = await this.mockExamQuestion.findOne({
                where: { id },
                relations: { user: true, mockExam: true },
            });
            if (!mockExamQuestion) {
                return {
                    ok: false,
                    error: '존재하지 않는 문제입니다.',
                };
            }
            const coAuthor = await this.examCoAuthor.findOne({
                where: {
                    user: {
                        id: user.id,
                    },
                    exam: {
                        id: mockExamQuestion.mockExam.id,
                    },
                },
            });
            const isCoAuthor = coAuthor ? true : false;
            const isOwner = mockExamQuestion.user.id === user.id || isCoAuthor;
            if (!isOwner) {
                return {
                    ok: false,
                    error: '권한이 없습니다.',
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
    async readAllQuestions() {
        try {
            const questions = await this.mockExamQuestion.find({
                relations: {
                    mockExamQuestionComment: true,
                },
            });
            return {
                questions,
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: '문제를 불러오지 못했습니다.',
            };
        }
    }
    async readAllMockExamQuestion(user) {
        try {
            const mockExamQuestions = await this.mockExamQuestion.find({
                relations: {
                    mockExamQuestionFeedback: true,
                    mockExamQuestionBookmark: { user: true },
                },
                where: {
                    mockExamQuestionBookmark: {
                        user: {
                            id: user && user.id,
                        },
                    },
                },
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
            const { id, bookmarked, ids, states, limit } = readMockExamQuestionsByMockExamIdInput;
            let questionStates = [];
            let questionBookmarks = [];
            let questionFeedbacks = [];
            let questionComments = [];
            const makeQuestionJoins = async (questions) => {
                const questionIds = questions.map((question) => question.id);
                await Promise.all([
                    (questionStates = user
                        ? await this.mockExamQuestionState.find({
                            relations: { question: true, user: true, exam: true },
                            where: {
                                question: (0, typeorm_2.In)(questionIds),
                                user: {
                                    id: user.id,
                                },
                            },
                        })
                        : []),
                    (questionBookmarks = user
                        ? await this.mockExamQuestionBookmark.find({
                            relations: { question: true, user: true },
                            where: {
                                question: (0, typeorm_2.In)(questionIds),
                                user: {
                                    id: user.id,
                                },
                            },
                        })
                        : []),
                    (questionFeedbacks = await this.mockExamQuestionFeedback.find({
                        relations: {
                            mockExamQuestion: true,
                            user: true,
                            recommendation: { user: true },
                        },
                        where: {
                            mockExamQuestion: (0, typeorm_2.In)(questionIds),
                        },
                        order: {
                            type: 'ASC',
                        },
                    })),
                    (questionComments = await this.mockExamQuestionComment.find({
                        relations: { question: true, user: true },
                        where: {
                            question: (0, typeorm_2.In)(questionIds),
                        },
                    })),
                ]);
                const result = questions.map((question) => {
                    return Object.assign(Object.assign({}, question), { state: questionStates.filter((state) => state.question.id === question.id), mockExamQuestionBookmark: questionBookmarks.filter((bookmark) => bookmark.question.id === question.id), mockExamQuestionComment: questionComments.filter((comment) => comment.question.id === question.id), mockExamQuestionFeedback: questionFeedbacks
                            .filter((feedback) => feedback.mockExamQuestion.id === question.id &&
                            (feedback.type !== mock_exam_question_feedback_entity_1.QuestionFeedbackType.PRIVATE ||
                                (feedback.type === mock_exam_question_feedback_entity_1.QuestionFeedbackType.PRIVATE &&
                                    feedback.user.id === (user === null || user === void 0 ? void 0 : user.id))))
                            .map((feedback) => {
                            const goodCount = feedback.recommendation.filter((recommendation) => recommendation.type ===
                                mock_exam_question_feedback_recommendation_entity_1.QuestionFeedbackRecommendationType.GOOD).length;
                            const badCount = feedback.recommendation.filter((recommendation) => recommendation.type ===
                                mock_exam_question_feedback_recommendation_entity_1.QuestionFeedbackRecommendationType.BAD).length;
                            const myRecommedationStatus = {
                                isGood: false,
                                isBad: false,
                            };
                            feedback.recommendation.forEach((recommendation) => {
                                if (recommendation.user.id === (user === null || user === void 0 ? void 0 : user.id)) {
                                    if (recommendation.type ===
                                        mock_exam_question_feedback_recommendation_entity_1.QuestionFeedbackRecommendationType.GOOD) {
                                        myRecommedationStatus.isGood = true;
                                    }
                                    if (recommendation.type ===
                                        mock_exam_question_feedback_recommendation_entity_1.QuestionFeedbackRecommendationType.BAD) {
                                        myRecommedationStatus.isBad = true;
                                    }
                                }
                            });
                            const recommendationCount = {
                                good: goodCount,
                                bad: badCount,
                            };
                            return Object.assign(Object.assign({}, feedback), { recommendationCount,
                                myRecommedationStatus });
                        })
                            .sort((a, b) => b.recommendationCount.good - a.recommendationCount.good ||
                            a.recommendationCount.bad - b.recommendationCount.bad) });
                });
                return result;
            };
            const filterQuestionStates = (questions) => {
                const result = questions.map((question) => {
                    var _a, _b;
                    const filteredState = (_a = question.state) === null || _a === void 0 ? void 0 : _a.filter((state) => { var _a; return user && ((_a = state.user) === null || _a === void 0 ? void 0 : _a.id) === user.id; });
                    const filteredBookmark = (_b = question.mockExamQuestionBookmark) === null || _b === void 0 ? void 0 : _b.filter((bookmark) => { var _a; return user && ((_a = bookmark.user) === null || _a === void 0 ? void 0 : _a.id) === user.id; });
                    const coreState = this.mockExamQuestionState.create({
                        exam: { id: 1 },
                        user,
                        state: mock_exam_question_state_entity_1.QuestionState.CORE,
                        created_at: new Date(),
                        updated_at: new Date(),
                        id: 0,
                        answer: '',
                    });
                    return Object.assign(Object.assign({}, question), { state: filteredState.length >= 1 ? filteredState : [coreState], mockExamQuestionBookmark: filteredBookmark });
                });
                return result;
            };
            if (!id && bookmarked) {
                if (!user) {
                    return {
                        ok: false,
                        error: '로그인이 필요합니다.',
                    };
                }
                let [questions, count] = await this.mockExamQuestion.findAndCount({
                    order: { number: 'ASC' },
                    where: {
                        mockExamQuestionBookmark: { user: { id: user.id } },
                    },
                });
                questions = await makeQuestionJoins(questions);
                return {
                    ok: true,
                    title: '전체',
                    questions,
                    count,
                };
            }
            if (ids) {
                console.time('랜덤모의고사');
                if (states) {
                    if (!user) {
                        return {
                            ok: false,
                            error: '로그인이 필요합니다.',
                            questions: [],
                            count: 0,
                            title: '전체',
                        };
                    }
                    let coreQuestions = [];
                    if (states.includes(mock_exam_question_state_entity_1.QuestionState.CORE)) {
                        const allQuestions = await this.mockExamQuestion.find({
                            relations: { mockExam: true },
                            where: {
                                mockExam: {
                                    id: (0, typeorm_2.In)(ids),
                                },
                            },
                        });
                        const questionIds = allQuestions.map((q) => q.id);
                        const existingQuestionStates = await this.mockExamQuestionState.find({
                            relations: { question: true, exam: true },
                            where: {
                                user: { id: user.id },
                                question: { id: (0, typeorm_2.In)(questionIds) },
                            },
                        });
                        const existingQuestionStateMap = new Map(existingQuestionStates.map((qs) => [qs.question.id, qs]));
                        coreQuestions = allQuestions.filter((question) => !existingQuestionStateMap.has(question.id));
                    }
                    let questionStates = await this.mockExamQuestionState
                        .createQueryBuilder('mockExamQuestionState')
                        .leftJoinAndSelect('mockExamQuestionState.question', 'question')
                        .leftJoinAndSelect('question.mockExam', 'mockExam')
                        .where('mockExamQuestionState.user.id = :id', { id: user.id })
                        .andWhere('mockExam.id IN (:...ids)', {
                        ids,
                    })
                        .andWhere('mockExamQuestionState.state IN (:...states)', {
                        states,
                    })
                        .limit(limit || 14)
                        .orderBy('RANDOM()')
                        .getMany();
                    let questions = questionStates.map((state) => state.question);
                    if (coreQuestions.length > 0) {
                        coreQuestions = (0, utils_1.shuffleArray)(coreQuestions).slice(0, limit || 14);
                        questions = (0, utils_1.shuffleArray)(questions.concat(coreQuestions)).slice(0, limit || 14);
                    }
                    questions = await makeQuestionJoins(questions);
                    questions = filterQuestionStates(questions);
                    console.timeEnd('랜덤모의고사');
                    return {
                        ok: true,
                        questions,
                        title: '랜덤모의고사',
                        count: questions.length,
                    };
                }
                let questions = await this.mockExamQuestion
                    .createQueryBuilder('mockExamQuestion')
                    .leftJoinAndSelect('mockExamQuestion.mockExam', 'mockExam')
                    .limit(limit || 14)
                    .where('mockExamQuestion.mockExam.id IN (:...ids)', { ids })
                    .orderBy('RANDOM()')
                    .getMany();
                if (!questions) {
                    return {
                        ok: false,
                        error: '문제가 존재하지 않습니다.',
                    };
                }
                questions = await makeQuestionJoins(questions);
                if (!user) {
                    questions = questions.map((question) => (Object.assign(Object.assign({}, question), { mockExamQuestionBookmark: [] })));
                }
                if (user) {
                    questions = filterQuestionStates(questions);
                }
                return {
                    ok: true,
                    questions,
                    title: '랜덤모의고사',
                    count: questions.length,
                };
            }
            const mockExam = await this.mockExam.findOne({
                where: { id },
                relations: { user: true },
            });
            if (!mockExam) {
                return {
                    ok: false,
                    error: '문제가 존재하지 않습니다.',
                };
            }
            let where;
            where = { mockExam: { id } };
            if (bookmarked && user) {
                where = Object.assign(Object.assign({}, where), { mockExamQuestionBookmark: { user: { id: user.id } } });
            }
            if (Array.isArray(states) && user) {
                where = Object.assign(Object.assign({}, where), { state: {
                        user: { id: user.id },
                        state: states.length >= 1 ? (0, typeorm_2.In)(states) : (0, typeorm_2.Not)(mock_exam_question_state_entity_1.QuestionState.CORE),
                    } });
            }
            let [questions, count] = await this.mockExamQuestion.findAndCount({
                order: { number: 'ASC' },
                where,
            });
            questions = await makeQuestionJoins(questions);
            if (!user) {
                questions = questions.map((question) => (Object.assign(Object.assign({}, question), { mockExamQuestionBookmark: [] })));
            }
            if (user) {
                questions = filterQuestionStates(questions);
            }
            if (user && bookmarked) {
                questions = questions.filter((question) => {
                    if (question.mockExamQuestionBookmark.length === 0)
                        return false;
                    const filteredQuestion = question.mockExamQuestionBookmark.filter((el) => el.user.id === user.id);
                    if (filteredQuestion.length >= 1)
                        return true;
                    return false;
                });
            }
            return {
                ok: true,
                title: mockExam.title,
                author: mockExam.user.nickname,
                questions,
                count,
            };
        }
        catch (e) {
            console.log(e);
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
                status: true,
                mockExamQuestion: {
                    number: true,
                    id: true,
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
        const questionNumbers = mockExam[0].mockExamQuestion.map((data) => ({
            questionNumber: data.number,
            questionId: data.id,
        }));
        return {
            ok: true,
            questionNumbers,
            examStatus: mockExam[0].status,
        };
    }
    async readMockExamQuestionsByState(user, readMockExamQuestionsByStateInput) {
        const { states, questionIds } = readMockExamQuestionsByStateInput;
        const where = questionIds.map((id) => ({
            question: { id },
            user: {
                id: user.id,
            },
        }));
        const mockExamQusetionStates = await this.mockExamQuestionState.find({
            where,
            relations: {
                question: { state: true },
                exam: true,
            },
        });
        const mockExamQusetions = mockExamQusetionStates.filter((state) => {
            return states.includes(state.state);
        });
        mockExamQusetions.sort((a, b) => a.question.number - b.question.number);
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
    __param(3, (0, typeorm_1.InjectRepository)(mock_exam_question_bookmark_entity_1.MockExamQuestionBookmark)),
    __param(4, (0, typeorm_1.InjectRepository)(mock_exam_question_feedback_entity_1.MockExamQuestionFeedback)),
    __param(5, (0, typeorm_1.InjectRepository)(mock_exam_question_comment_entity_1.MockExamQuestionComment)),
    __param(6, (0, typeorm_1.InjectRepository)(exam_co_author_entity_1.ExamCoAuthor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MockExamQuestionService);
exports.MockExamQuestionService = MockExamQuestionService;
//# sourceMappingURL=mock-exams-question.service.js.map