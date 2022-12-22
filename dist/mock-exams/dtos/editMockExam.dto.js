"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditMockExamOutput = exports.EditMockExamInput = void 0;
const output_dto_1 = require("../../common/dtos/output.dto");
const mock_exam_entity_1 = require("../entities/mock-exam.entity");
const graphql_1 = require("@nestjs/graphql");
let EditMockExamInput = class EditMockExamInput extends (0, graphql_1.PickType)(mock_exam_entity_1.MockExam, ['id', 'title']) {
};
EditMockExamInput = __decorate([
    (0, graphql_1.InputType)()
], EditMockExamInput);
exports.EditMockExamInput = EditMockExamInput;
let EditMockExamOutput = class EditMockExamOutput extends output_dto_1.CoreOutput {
};
EditMockExamOutput = __decorate([
    (0, graphql_1.ObjectType)()
], EditMockExamOutput);
exports.EditMockExamOutput = EditMockExamOutput;
//# sourceMappingURL=editMockExam.dto.js.map