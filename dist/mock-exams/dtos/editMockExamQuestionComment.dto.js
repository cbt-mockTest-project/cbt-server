"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditMockExamQuestionCommentOutput = exports.EditMockExamQuestionCommentInput = void 0;
const mock_exam_question_comment_entity_1 = require("../entities/mock-exam-question-comment.entity");
const output_dto_1 = require("../../common/dtos/output.dto");
const graphql_1 = require("@nestjs/graphql");
let EditMockExamQuestionCommentInput = class EditMockExamQuestionCommentInput extends (0, graphql_1.PickType)(mock_exam_question_comment_entity_1.MockExamQuestionComment, ['id', 'content']) {
};
EditMockExamQuestionCommentInput = __decorate([
    (0, graphql_1.InputType)()
], EditMockExamQuestionCommentInput);
exports.EditMockExamQuestionCommentInput = EditMockExamQuestionCommentInput;
let EditMockExamQuestionCommentOutput = class EditMockExamQuestionCommentOutput extends output_dto_1.CoreOutput {
};
EditMockExamQuestionCommentOutput = __decorate([
    (0, graphql_1.ObjectType)()
], EditMockExamQuestionCommentOutput);
exports.EditMockExamQuestionCommentOutput = EditMockExamQuestionCommentOutput;
//# sourceMappingURL=editMockExamQuestionComment.dto.js.map