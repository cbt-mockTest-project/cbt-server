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
exports.MockExamQuestionComment = void 0;
const mock_exam_question_comment_like_entity_1 = require("./mock-exam-question-comment-like.entity");
const mock_exam_question_entity_1 = require("./mock-exam-question.entity");
const core_entity_1 = require("../../common/entities/core.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
let MockExamQuestionComment = class MockExamQuestionComment extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], MockExamQuestionComment.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mock_exam_question_entity_1.MockExamQuestion, (mockExamQuestion) => mockExamQuestion.mockExamQuestionComment, { onDelete: 'CASCADE' }),
    (0, graphql_1.Field)(() => mock_exam_question_entity_1.MockExamQuestion),
    __metadata("design:type", mock_exam_question_entity_1.MockExamQuestion)
], MockExamQuestionComment.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.mockExamQuestionComment, {
        onDelete: 'CASCADE',
    }),
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], MockExamQuestionComment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mock_exam_question_comment_like_entity_1.MockExamQuestionCommentLike, (mockExamQuestionCommentLike) => mockExamQuestionCommentLike.comment),
    (0, graphql_1.Field)(() => [mock_exam_question_comment_like_entity_1.MockExamQuestionCommentLike]),
    __metadata("design:type", Array)
], MockExamQuestionComment.prototype, "commentLike", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { defaultValue: false }),
    __metadata("design:type", Boolean)
], MockExamQuestionComment.prototype, "likeState", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { defaultValue: 0 }),
    __metadata("design:type", Number)
], MockExamQuestionComment.prototype, "likesCount", void 0);
MockExamQuestionComment = __decorate([
    (0, graphql_1.InputType)('MockExamQuestionCommentInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], MockExamQuestionComment);
exports.MockExamQuestionComment = MockExamQuestionComment;
//# sourceMappingURL=mock-exam-question-comment.entity.js.map