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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockExamHistory = void 0;
const user_entity_1 = require("../../users/entities/user.entity");
const graphql_1 = require("@nestjs/graphql");
const core_entity_1 = require("../../common/entities/core.entity");
const typeorm_1 = require("typeorm");
const mock_exam_entity_1 = require("./mock-exam.entity");
let MockExamHistory = class MockExamHistory extends core_entity_1.CoreEntity {
};
__decorate([
    (0, graphql_1.Field)(() => mock_exam_entity_1.MockExam),
    (0, typeorm_1.ManyToOne)(() => mock_exam_entity_1.MockExam, (mockExam) => mockExam.history),
    __metadata("design:type", mock_exam_entity_1.MockExam)
], MockExamHistory.prototype, "exam", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.mockExamHistory),
    __metadata("design:type", user_entity_1.User)
], MockExamHistory.prototype, "user", void 0);
MockExamHistory = __decorate([
    (0, graphql_1.InputType)('MockExamHistoryInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], MockExamHistory);
exports.MockExamHistory = MockExamHistory;
//# sourceMappingURL=mock-exam-history.js.map