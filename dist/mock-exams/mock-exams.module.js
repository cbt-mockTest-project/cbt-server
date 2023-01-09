"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockExamsModule = void 0;
const mock_exams_question_bookmark_service_1 = require("./mock-exams-question-bookmark.service");
const mock_exams_question_bookmark_resolver_1 = require("./mock-exams-question-bookmark.resolver");
const mock_exam_question_comment_like_entity_1 = require("./entities/mock-exam-question-comment-like.entity");
const mock_exams_question_comment_like_resolver_1 = require("./mock-exams-question-comment-like.resolver");
const mock_exams_question_comment_service_1 = require("./mock-exams-question-comment.service");
const user_entity_1 = require("../users/entities/user.entity");
const mock_exams_question_state_service_1 = require("./mock-exams-question-state.service");
const mock_exams_question_state_resolver_1 = require("./mock-exams-question-state.resolver");
const mock_exam_question_feedback_entity_1 = require("./entities/mock-exam-question-feedback.entity");
const mock_exams_question_feedback_service_1 = require("./mock-exams-question-feedback.service");
const mock_exams_question_feedback_resolver_1 = require("./mock-exams-question-feedback.resolver");
const mock_exam_question_entity_1 = require("./entities/mock-exam-question.entity");
const mock_exams_question_resolver_1 = require("./mock-exams-question.resolver");
const mock_exam_entity_1 = require("./entities/mock-exam.entity");
const mock_exams_resolver_1 = require("./mock-exams.resolver");
const mock_exam_category_entity_1 = require("./entities/mock-exam-category.entity");
const typeorm_1 = require("@nestjs/typeorm");
const mock_exams_category_service_1 = require("./mock-exams-category.service");
const mock_exams_category_resolver_1 = require("./mock-exams-category.resolver");
const common_1 = require("@nestjs/common");
const mock_exams_service_1 = require("./mock-exams.service");
const mock_exams_question_service_1 = require("./mock-exams-question.service");
const mock_exam_question_state_entity_1 = require("./entities/mock-exam-question-state.entity");
const mock_exam_question_comment_entity_1 = require("./entities/mock-exam-question-comment.entity");
const mock_exams_question_comment_resolver_1 = require("./mock-exams-question-comment.resolver");
const mock_exams_question_comment_like_service_1 = require("./mock-exams-question-comment-like.service");
const mock_exam_question_bookmark_entity_1 = require("./entities/mock-exam-question-bookmark.entity");
let MockExamsModule = class MockExamsModule {
};
MockExamsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                mock_exam_category_entity_1.MockExamCategory,
                mock_exam_entity_1.MockExam,
                mock_exam_question_entity_1.MockExamQuestion,
                mock_exam_question_feedback_entity_1.MockExamQuestionFeedback,
                mock_exam_question_state_entity_1.MockExamQuestionState,
                mock_exam_question_comment_entity_1.MockExamQuestionComment,
                mock_exam_question_comment_like_entity_1.MockExamQuestionCommentLike,
                mock_exam_question_bookmark_entity_1.MockExamQuestionBookmark,
                user_entity_1.User,
            ]),
        ],
        providers: [
            mock_exams_category_resolver_1.MockExamCategoryResolver,
            mock_exams_category_service_1.MockExamCategoryService,
            mock_exams_resolver_1.MockExamResolver,
            mock_exams_service_1.MockExamService,
            mock_exams_question_resolver_1.MockExamQuestionResolver,
            mock_exams_question_service_1.MockExamQuestionService,
            mock_exams_question_feedback_resolver_1.MockExamQuestionFeedbackResolver,
            mock_exams_question_feedback_service_1.MockExamQuestionFeedbackSerivce,
            mock_exams_question_state_resolver_1.MockExamQuestionStateResolver,
            mock_exams_question_state_service_1.MockExamQuestionStateService,
            mock_exams_question_comment_resolver_1.MockExamQuestionCommentResolver,
            mock_exams_question_comment_service_1.MockExamQuestionCommentSerivce,
            mock_exams_question_comment_like_resolver_1.MockExamQuestionCommentLikeResolver,
            mock_exams_question_comment_like_service_1.MockExamQuestionCommentLikeSerivce,
            mock_exams_question_bookmark_resolver_1.MockExamQuestionBookmarkResolver,
            mock_exams_question_bookmark_service_1.MockExamQuestionBookmarkSerivce,
        ],
        exports: [],
    })
], MockExamsModule);
exports.MockExamsModule = MockExamsModule;
//# sourceMappingURL=mock-exams.module.js.map