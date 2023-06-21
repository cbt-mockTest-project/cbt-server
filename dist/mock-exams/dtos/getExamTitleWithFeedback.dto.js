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
exports.GetExamTitleWithFeedbackOutput = exports.GetExamTitleWithFeedbackTitle = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
let GetExamTitleWithFeedbackTitle = class GetExamTitleWithFeedbackTitle {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], GetExamTitleWithFeedbackTitle.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], GetExamTitleWithFeedbackTitle.prototype, "title", void 0);
GetExamTitleWithFeedbackTitle = __decorate([
    (0, graphql_1.ObjectType)()
], GetExamTitleWithFeedbackTitle);
exports.GetExamTitleWithFeedbackTitle = GetExamTitleWithFeedbackTitle;
let GetExamTitleWithFeedbackOutput = class GetExamTitleWithFeedbackOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => [GetExamTitleWithFeedbackTitle]),
    __metadata("design:type", Array)
], GetExamTitleWithFeedbackOutput.prototype, "titles", void 0);
GetExamTitleWithFeedbackOutput = __decorate([
    (0, graphql_1.ObjectType)()
], GetExamTitleWithFeedbackOutput);
exports.GetExamTitleWithFeedbackOutput = GetExamTitleWithFeedbackOutput;
//# sourceMappingURL=getExamTitleWithFeedback.dto.js.map