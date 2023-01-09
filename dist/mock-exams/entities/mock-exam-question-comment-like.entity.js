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
exports.MockExamQuestionCommentLike = void 0;
const mock_exam_question_comment_entity_1 = require("./mock-exam-question-comment.entity");
const core_entity_1 = require("../../common/entities/core.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
let MockExamQuestionCommentLike = class MockExamQuestionCommentLike extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => mock_exam_question_comment_entity_1.MockExamQuestionComment, (mockExamQuestionComment) => mockExamQuestionComment.commentLike, { onDelete: 'CASCADE' }),
    (0, graphql_1.Field)(() => mock_exam_question_comment_entity_1.MockExamQuestionComment),
    __metadata("design:type", mock_exam_question_comment_entity_1.MockExamQuestionComment)
], MockExamQuestionCommentLike.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.mockExamQuestionComment, {
        onDelete: 'CASCADE',
    }),
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], MockExamQuestionCommentLike.prototype, "user", void 0);
MockExamQuestionCommentLike = __decorate([
    (0, graphql_1.InputType)('MockExamQuestionCommentLikeInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], MockExamQuestionCommentLike);
exports.MockExamQuestionCommentLike = MockExamQuestionCommentLike;
//# sourceMappingURL=mock-exam-question-comment-like.entity.js.map