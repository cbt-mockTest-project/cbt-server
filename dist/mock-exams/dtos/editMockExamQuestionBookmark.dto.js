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
exports.EditMockExamQuestionBookmarkOutput = exports.EditMockExamQuestionBookmarkInput = void 0;
const output_dto_1 = require("../../common/dtos/output.dto");
const graphql_1 = require("@nestjs/graphql");
let EditMockExamQuestionBookmarkInput = class EditMockExamQuestionBookmarkInput {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], EditMockExamQuestionBookmarkInput.prototype, "questionId", void 0);
EditMockExamQuestionBookmarkInput = __decorate([
    (0, graphql_1.InputType)()
], EditMockExamQuestionBookmarkInput);
exports.EditMockExamQuestionBookmarkInput = EditMockExamQuestionBookmarkInput;
let EditMockExamQuestionBookmarkOutput = class EditMockExamQuestionBookmarkOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => Boolean, { defaultValue: false }),
    __metadata("design:type", Boolean)
], EditMockExamQuestionBookmarkOutput.prototype, "currentState", void 0);
EditMockExamQuestionBookmarkOutput = __decorate([
    (0, graphql_1.ObjectType)()
], EditMockExamQuestionBookmarkOutput);
exports.EditMockExamQuestionBookmarkOutput = EditMockExamQuestionBookmarkOutput;
//# sourceMappingURL=editMockExamQuestionBookmark.dto.js.map