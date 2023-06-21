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
exports.ReadMockExamOutput = exports.ReadMockExamInput = void 0;
const mock_exam_entity_1 = require("./../entities/mock-exam.entity");
const output_dto_1 = require("./../../common/dtos/output.dto");
const graphql_1 = require("@nestjs/graphql");
let ReadMockExamInput = class ReadMockExamInput {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], ReadMockExamInput.prototype, "id", void 0);
ReadMockExamInput = __decorate([
    (0, graphql_1.InputType)()
], ReadMockExamInput);
exports.ReadMockExamInput = ReadMockExamInput;
let ReadMockExamOutput = class ReadMockExamOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => mock_exam_entity_1.MockExam),
    __metadata("design:type", mock_exam_entity_1.MockExam)
], ReadMockExamOutput.prototype, "mockExam", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Number]),
    __metadata("design:type", Array)
], ReadMockExamOutput.prototype, "questionNumbers", void 0);
ReadMockExamOutput = __decorate([
    (0, graphql_1.ObjectType)()
], ReadMockExamOutput);
exports.ReadMockExamOutput = ReadMockExamOutput;
//# sourceMappingURL=readMockExam.dto.js.map