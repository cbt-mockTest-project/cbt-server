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
exports.SearchMockExamOutput = exports.SearchMockExamInput = void 0;
const mock_exam_entity_1 = require("./../entities/mock-exam.entity");
const output_dto_1 = require("./../../common/dtos/output.dto");
const graphql_1 = require("@nestjs/graphql");
let SearchMockExamInput = class SearchMockExamInput {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SearchMockExamInput.prototype, "query", void 0);
SearchMockExamInput = __decorate([
    (0, graphql_1.InputType)()
], SearchMockExamInput);
exports.SearchMockExamInput = SearchMockExamInput;
let SearchMockExamOutput = class SearchMockExamOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => [mock_exam_entity_1.MockExam]),
    __metadata("design:type", Array)
], SearchMockExamOutput.prototype, "mockExams", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], SearchMockExamOutput.prototype, "totalResults", void 0);
SearchMockExamOutput = __decorate([
    (0, graphql_1.ObjectType)()
], SearchMockExamOutput);
exports.SearchMockExamOutput = SearchMockExamOutput;
//# sourceMappingURL=searchMockExam.dto.js.map