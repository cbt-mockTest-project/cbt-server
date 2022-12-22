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
exports.CreateMockExamOutput = exports.CreateMockExamInput = void 0;
const mock_exam_entity_1 = require("./../entities/mock-exam.entity");
const output_dto_1 = require("./../../common/dtos/output.dto");
const graphql_1 = require("@nestjs/graphql");
let CreateMockExamInput = class CreateMockExamInput extends (0, graphql_1.PickType)(mock_exam_entity_1.MockExam, ['title']) {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateMockExamInput.prototype, "categoryName", void 0);
CreateMockExamInput = __decorate([
    (0, graphql_1.InputType)()
], CreateMockExamInput);
exports.CreateMockExamInput = CreateMockExamInput;
let CreateMockExamOutput = class CreateMockExamOutput extends output_dto_1.CoreOutput {
};
CreateMockExamOutput = __decorate([
    (0, graphql_1.ObjectType)()
], CreateMockExamOutput);
exports.CreateMockExamOutput = CreateMockExamOutput;
//# sourceMappingURL=createMockExam.dto.js.map