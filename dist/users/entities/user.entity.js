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
exports.User = exports.LoginType = exports.UserRole = void 0;
const exam_co_author_entity_1 = require("./../../exam-co-author/entities/exam-co-author.entity");
const mock_exam_history_1 = require("./../../mock-exams/entities/mock-exam-history");
const question_card_entity_1 = require("./../../question-card/entities/question-card.entity");
const mock_exam_category_entity_1 = require("./../../mock-exams/entities/mock-exam-category.entity");
const postComment_entity_1 = require("./../../post/entities/postComment.entity");
const post_entity_1 = require("./../../post/entities/post.entity");
const mock_exam_question_comment_entity_1 = require("./../../mock-exams/entities/mock-exam-question-comment.entity");
const core_entity_1 = require("./../../common/entities/core.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const mock_exam_question_state_entity_1 = require("../../mock-exams/entities/mock-exam-question-state.entity");
const mock_exam_question_feedback_entity_1 = require("../../mock-exams/entities/mock-exam-question-feedback.entity");
const feedback_entity_1 = require("./feedback.entity");
const mock_exam_question_comment_like_entity_1 = require("../../mock-exams/entities/mock-exam-question-comment-like.entity");
const notice_entity_1 = require("./notice.entity");
const mock_exam_question_bookmark_entity_1 = require("../../mock-exams/entities/mock-exam-question-bookmark.entity");
const visit_entity_1 = require("../../visit/entities/visit.entity");
const mock_exam_entity_1 = require("../../mock-exams/entities/mock-exam.entity");
const mock_exam_question_entity_1 = require("../../mock-exams/entities/mock-exam-question.entity");
const question_card_category_1 = require("../../question-card/entities/question-card-category");
const mock_exam_question_feedback_recommendation_entity_1 = require("../../mock-exams/entities/mock-exam-question-feedback-recommendation.entity");
const payment_entity_1 = require("../../payments/entities/payment.entity");
const userAndRole_entity_1 = require("./userAndRole.entity");
const attendance_entity_1 = require("../../attendance/entities/attendance.entity");
const Todo_entity_1 = require("../../todo/entities/Todo.entity");
var UserRole;
(function (UserRole) {
    UserRole["CLIENT"] = "CLIENT";
    UserRole["CLIENT_BASIC"] = "CLIENT_BASIC";
    UserRole["CLIENT_SAFE_PREMIUM"] = "CLIENT_SAFE_PREMIUM";
    UserRole["ADMIN"] = "ADMIN";
    UserRole["PARTNER"] = "PARTNER";
    UserRole["PAYMENT_TEST"] = "PAYMENT_TEST";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var LoginType;
(function (LoginType) {
    LoginType["NAVER"] = "NAVER";
    LoginType["KAKAO"] = "KAKAO";
    LoginType["GOOGLE"] = "GOOGLE";
    LoginType["EMAIL"] = "EMAIL";
})(LoginType = exports.LoginType || (exports.LoginType = {}));
(0, graphql_1.registerEnumType)(UserRole, { name: 'UserRole' });
(0, graphql_1.registerEnumType)(LoginType, { name: 'LoginType' });
let User = class User extends core_entity_1.CoreEntity {
    async hashPassword() {
        if (this.password) {
            try {
                this.password = await bcrypt.hash(this.password, 10);
            }
            catch (_a) {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async checkPassword(hashedPassword) {
        try {
            const ok = await bcrypt.compare(hashedPassword, this.password);
            return ok;
        }
        catch (_a) {
            throw new common_1.InternalServerErrorException();
        }
    }
};
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], User.prototype, "isAllowAdblock", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], User.prototype, "usedFreeTrial", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false, nullable: true }),
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: UserRole,
        nullable: true,
        default: null,
    }),
    (0, graphql_1.Field)(() => UserRole),
    (0, class_validator_1.IsEnum)(UserRole),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: LoginType,
        default: LoginType.EMAIL,
    }),
    (0, graphql_1.Field)(() => LoginType),
    (0, class_validator_1.IsEnum)(LoginType),
    __metadata("design:type", String)
], User.prototype, "LoginType", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mock_exam_question_state_entity_1.MockExamQuestionState, (mockExamQuestionState) => mockExamQuestionState.user),
    (0, graphql_1.Field)(() => [mock_exam_question_state_entity_1.MockExamQuestionState]),
    __metadata("design:type", Array)
], User.prototype, "mockExamQuestionState", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mock_exam_entity_1.MockExam, (mockExam) => mockExam.user),
    (0, graphql_1.Field)(() => [mock_exam_entity_1.MockExam]),
    __metadata("design:type", Array)
], User.prototype, "mockExam", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mock_exam_category_entity_1.MockExamCategory, (mockExamCategory) => mockExamCategory.user),
    (0, graphql_1.Field)(() => [mock_exam_category_entity_1.MockExamCategory]),
    __metadata("design:type", Array)
], User.prototype, "mockExamCategory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mock_exam_question_comment_entity_1.MockExamQuestionComment, (mockExamQuestionComment) => mockExamQuestionComment.user),
    (0, graphql_1.Field)(() => [mock_exam_question_comment_entity_1.MockExamQuestionComment]),
    __metadata("design:type", Array)
], User.prototype, "mockExamQuestionComment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => postComment_entity_1.PostComment, (postComment) => postComment.user),
    (0, graphql_1.Field)(() => [postComment_entity_1.PostComment]),
    __metadata("design:type", Array)
], User.prototype, "postComment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mock_exam_question_comment_like_entity_1.MockExamQuestionCommentLike, (mockExamQuestionCommentLike) => mockExamQuestionCommentLike.user),
    (0, graphql_1.Field)(() => [mock_exam_question_comment_like_entity_1.MockExamQuestionCommentLike]),
    __metadata("design:type", Array)
], User.prototype, "mockExamQuestionCommentLike", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mock_exam_question_feedback_entity_1.MockExamQuestionFeedback, (questionFeedback) => questionFeedback.user),
    (0, graphql_1.Field)(() => [mock_exam_question_feedback_entity_1.MockExamQuestionFeedback]),
    __metadata("design:type", Array)
], User.prototype, "questionFeedback", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => feedback_entity_1.Feedback, (feedback) => feedback.user),
    (0, graphql_1.Field)(() => [feedback_entity_1.Feedback]),
    __metadata("design:type", Array)
], User.prototype, "feedback", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => visit_entity_1.Visit, (visit) => visit.user),
    (0, graphql_1.Field)(() => visit_entity_1.Visit),
    __metadata("design:type", Array)
], User.prototype, "visit", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notice_entity_1.Notice, (notice) => notice.user),
    (0, graphql_1.Field)(() => [notice_entity_1.Notice], { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "notice", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payment_entity_1.Payment, (payment) => payment.user),
    (0, graphql_1.Field)(() => [payment_entity_1.Payment]),
    __metadata("design:type", Array)
], User.prototype, "payments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_entity_1.Post, (post) => post.user),
    (0, graphql_1.Field)(() => [post_entity_1.Post], { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exam_co_author_entity_1.ExamCoAuthor, (examCoAuthor) => examCoAuthor.user),
    (0, graphql_1.Field)(() => [exam_co_author_entity_1.ExamCoAuthor], { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "examCoAuthor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => attendance_entity_1.Attendance, (attendance) => attendance.user),
    (0, graphql_1.Field)(() => [attendance_entity_1.Attendance], { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "attendances", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => [mock_exam_question_bookmark_entity_1.MockExamQuestionBookmark]),
    (0, typeorm_1.OneToMany)(() => mock_exam_question_bookmark_entity_1.MockExamQuestionBookmark, (mockExamQuestionBookmark) => mockExamQuestionBookmark.user, {
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", Array)
], User.prototype, "mockExamQuestionBookmark", void 0);
__decorate([
    (0, graphql_1.Field)(() => [mock_exam_question_entity_1.MockExamQuestion]),
    (0, typeorm_1.OneToMany)(() => mock_exam_question_entity_1.MockExamQuestion, (mockExamQuestionMockExamQuestion) => mockExamQuestionMockExamQuestion.user),
    __metadata("design:type", Array)
], User.prototype, "mockExamQuestion", void 0);
__decorate([
    (0, graphql_1.Field)(() => [mock_exam_history_1.MockExamHistory]),
    (0, typeorm_1.OneToMany)(() => mock_exam_history_1.MockExamHistory, (mockExamHistory) => mockExamHistory.user),
    __metadata("design:type", Array)
], User.prototype, "mockExamHistory", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Todo_entity_1.Todo]),
    (0, typeorm_1.OneToMany)(() => Todo_entity_1.Todo, (todo) => todo.user),
    __metadata("design:type", Array)
], User.prototype, "todos", void 0);
__decorate([
    (0, graphql_1.Field)(() => [question_card_entity_1.QuestionCard]),
    (0, typeorm_1.OneToMany)(() => question_card_entity_1.QuestionCard, (questionCard) => questionCard.user),
    __metadata("design:type", Array)
], User.prototype, "questionCards", void 0);
__decorate([
    (0, graphql_1.Field)(() => [question_card_category_1.QuestionCardCategory]),
    (0, typeorm_1.OneToMany)(() => question_card_category_1.QuestionCardCategory, (questionCardCategory) => questionCardCategory.user),
    __metadata("design:type", Array)
], User.prototype, "questionCardCategorys", void 0);
__decorate([
    (0, graphql_1.Field)(() => [mock_exam_question_feedback_recommendation_entity_1.MockExamQuestionFeedbackRecommendation]),
    (0, typeorm_1.OneToMany)(() => mock_exam_question_feedback_recommendation_entity_1.MockExamQuestionFeedbackRecommendation, (feedbackRecommendation) => feedbackRecommendation.user),
    __metadata("design:type", Array)
], User.prototype, "feedbackRecommendation", void 0);
__decorate([
    (0, graphql_1.Field)(() => [userAndRole_entity_1.UserAndRole]),
    (0, typeorm_1.OneToMany)(() => userAndRole_entity_1.UserAndRole, (userRole) => userRole.user),
    __metadata("design:type", Array)
], User.prototype, "userRoles", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
User = __decorate([
    (0, graphql_1.InputType)('UserInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map