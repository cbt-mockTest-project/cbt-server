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
exports.ReadMockExamTitlesByCateoryOutput = exports.ReadMockExamTitlesByCateoryInput = exports.ExamTitleAndId = void 0;
const user_entity_1 = require("./../../users/entities/user.entity");
const output_dto_1 = require("../../common/dtos/output.dto");
const mock_exam_category_entity_1 = require("../entities/mock-exam-category.entity");
const graphql_1 = require("@nestjs/graphql");
const mock_exam_entity_1 = require("../entities/mock-exam.entity");
let ExamTitleAndId = class ExamTitleAndId {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], ExamTitleAndId.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ExamTitleAndId.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ExamTitleAndId.prototype, "slug", void 0);
__decorate([
    (0, graphql_1.Field)(() => mock_exam_entity_1.ExamStatus),
    __metadata("design:type", String)
], ExamTitleAndId.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.UserRole),
    __metadata("design:type", String)
], ExamTitleAndId.prototype, "role", void 0);
ExamTitleAndId = __decorate([
    (0, graphql_1.ObjectType)()
], ExamTitleAndId);
exports.ExamTitleAndId = ExamTitleAndId;
let ReadMockExamTitlesByCateoryInput = class ReadMockExamTitlesByCateoryInput extends (0, graphql_1.PickType)(mock_exam_category_entity_1.MockExamCategory, ['name']) {
};
__decorate([
    (0, graphql_1.Field)(() => Boolean, { defaultValue: false, nullable: true }),
    __metadata("design:type", Boolean)
], ReadMockExamTitlesByCateoryInput.prototype, "all", void 0);
ReadMockExamTitlesByCateoryInput = __decorate([
    (0, graphql_1.InputType)()
], ReadMockExamTitlesByCateoryInput);
exports.ReadMockExamTitlesByCateoryInput = ReadMockExamTitlesByCateoryInput;
let ReadMockExamTitlesByCateoryOutput = class ReadMockExamTitlesByCateoryOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => [ExamTitleAndId]),
    __metadata("design:type", Array)
], ReadMockExamTitlesByCateoryOutput.prototype, "titles", void 0);
ReadMockExamTitlesByCateoryOutput = __decorate([
    (0, graphql_1.ObjectType)()
], ReadMockExamTitlesByCateoryOutput);
exports.ReadMockExamTitlesByCateoryOutput = ReadMockExamTitlesByCateoryOutput;
//# sourceMappingURL=readMockExamTitlesByCateory.dto.js.map