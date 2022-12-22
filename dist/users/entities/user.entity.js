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
exports.User = exports.UserRole = void 0;
const core_entity_1 = require("./../../common/entities/core.entity");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const mock_exam_question_state_entity_1 = require("../../mock-exams/entities/mock-exam-question-state.entity");
const mock_exam_question_feedback_entity_1 = require("../../mock-exams/entities/mock-exam-question-feedback.entity");
const feedback_entity_1 = require("./feedback.entity");
var UserRole;
(function (UserRole) {
    UserRole["CLIENT"] = "CLIENT";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
(0, graphql_1.registerEnumType)(UserRole, { name: 'UserRole' });
let User = class User extends core_entity_1.CoreEntity {
    async hashPassword() {
        if (this.password) {
            try {
                this.password = await bcrypt.hash(this.password, 10);
            }
            catch (e) {
                console.log(e);
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async checkPassword(hashedPassword) {
        try {
            const ok = await bcrypt.compare(hashedPassword, this.password);
            return ok;
        }
        catch (e) {
            console.log(e);
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
    (0, typeorm_1.Column)({ select: false }),
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: UserRole,
    }),
    (0, graphql_1.Field)(() => UserRole),
    (0, class_validator_1.IsEnum)(UserRole),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mock_exam_question_state_entity_1.MockExamQuestionState, (mockExamQuestionState) => mockExamQuestionState.user),
    (0, graphql_1.Field)(() => [mock_exam_question_state_entity_1.MockExamQuestionState]),
    __metadata("design:type", Array)
], User.prototype, "mockExamQuestionState", void 0);
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
    (0, typeorm_1.DeleteDateColumn)(),
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
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