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
exports.MockExamQuestionStateResolver = void 0;
const resetMyExamQuestionState_dto_1 = require("./dtos/resetMyExamQuestionState.dto");
const user_entity_1 = require("../users/entities/user.entity");
const createOrUpdateMockExamQuestionState_dto_1 = require("./dtos/createOrUpdateMockExamQuestionState.dto");
const mock_exams_question_state_service_1 = require("./mock-exams-question-state.service");
const mock_exam_question_state_entity_1 = require("./entities/mock-exam-question-state.entity");
const graphql_1 = require("@nestjs/graphql");
const role_decorators_1 = require("../auth/role.decorators");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
let MockExamQuestionStateResolver = class MockExamQuestionStateResolver {
    constructor(mockExamQuestionStateService) {
        this.mockExamQuestionStateService = mockExamQuestionStateService;
    }
    async createOrUpdateMockExamQuestionState(user, createOrUpdateMockExamQuestionStateInput) {
        return this.mockExamQuestionStateService.createOrUpdateMockExamQuestionState(user, createOrUpdateMockExamQuestionStateInput);
    }
    async resetMyExamQuestionState(resetMyExamQuestionStateInput, user) {
        return this.mockExamQuestionStateService.resetMyExamQuestionState(resetMyExamQuestionStateInput, user);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => createOrUpdateMockExamQuestionState_dto_1.CreateOrUpdateMockExamQuestionStateOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        createOrUpdateMockExamQuestionState_dto_1.CreateOrUpdateMockExamQuestionStateInput]),
    __metadata("design:returntype", Promise)
], MockExamQuestionStateResolver.prototype, "createOrUpdateMockExamQuestionState", null);
__decorate([
    (0, graphql_1.Mutation)(() => resetMyExamQuestionState_dto_1.ResetMyExamQuestionStateOutput),
    (0, role_decorators_1.Role)(['ANY']),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resetMyExamQuestionState_dto_1.ResetMyExamQuestionStateInput,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MockExamQuestionStateResolver.prototype, "resetMyExamQuestionState", null);
MockExamQuestionStateResolver = __decorate([
    (0, graphql_1.Resolver)(() => mock_exam_question_state_entity_1.MockExamQuestionState),
    __metadata("design:paramtypes", [mock_exams_question_state_service_1.MockExamQuestionStateService])
], MockExamQuestionStateResolver);
exports.MockExamQuestionStateResolver = MockExamQuestionStateResolver;
//# sourceMappingURL=mock-exams-question-state.resolver.js.map