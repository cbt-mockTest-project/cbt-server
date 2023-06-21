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
exports.UpdateApprovedStateOfMockExamQuestionOutput = exports.UpdateApprovedStateOfMockExamQuestionInput = void 0;
const output_dto_1 = require("./../../common/dtos/output.dto");
const graphql_1 = require("@nestjs/graphql");
let UpdateApprovedStateOfMockExamQuestionInput = class UpdateApprovedStateOfMockExamQuestionInput {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], UpdateApprovedStateOfMockExamQuestionInput.prototype, "questionId", void 0);
UpdateApprovedStateOfMockExamQuestionInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateApprovedStateOfMockExamQuestionInput);
exports.UpdateApprovedStateOfMockExamQuestionInput = UpdateApprovedStateOfMockExamQuestionInput;
let UpdateApprovedStateOfMockExamQuestionOutput = class UpdateApprovedStateOfMockExamQuestionOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UpdateApprovedStateOfMockExamQuestionOutput.prototype, "currentApprovedState", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], UpdateApprovedStateOfMockExamQuestionOutput.prototype, "questionId", void 0);
UpdateApprovedStateOfMockExamQuestionOutput = __decorate([
    (0, graphql_1.ObjectType)()
], UpdateApprovedStateOfMockExamQuestionOutput);
exports.UpdateApprovedStateOfMockExamQuestionOutput = UpdateApprovedStateOfMockExamQuestionOutput;
//# sourceMappingURL=updateApprovedStateOfMockExamQuestion.dto.js.map