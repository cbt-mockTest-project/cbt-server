"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMockExamOutput = exports.DeleteMockExamInput = void 0;
const output_dto_1 = require("./../../common/dtos/output.dto");
const mock_exam_entity_1 = require("./../entities/mock-exam.entity");
const graphql_1 = require("@nestjs/graphql");
let DeleteMockExamInput = class DeleteMockExamInput extends (0, graphql_1.PickType)(mock_exam_entity_1.MockExam, ['id']) {
};
DeleteMockExamInput = __decorate([
    (0, graphql_1.InputType)()
], DeleteMockExamInput);
exports.DeleteMockExamInput = DeleteMockExamInput;
let DeleteMockExamOutput = class DeleteMockExamOutput extends output_dto_1.CoreOutput {
};
DeleteMockExamOutput = __decorate([
    (0, graphql_1.ObjectType)()
], DeleteMockExamOutput);
exports.DeleteMockExamOutput = DeleteMockExamOutput;
//# sourceMappingURL=deleteMockExam.dto.js.map