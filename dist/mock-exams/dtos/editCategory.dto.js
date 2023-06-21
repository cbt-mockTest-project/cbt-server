"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditMockExamCategoryOutput = exports.EditMockExamCategoryInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
const mock_exam_category_entity_1 = require("../entities/mock-exam-category.entity");
let EditMockExamCategoryInput = class EditMockExamCategoryInput extends (0, graphql_1.PickType)(mock_exam_category_entity_1.MockExamCategory, [
    'id',
    'name',
]) {
};
EditMockExamCategoryInput = __decorate([
    (0, graphql_1.InputType)()
], EditMockExamCategoryInput);
exports.EditMockExamCategoryInput = EditMockExamCategoryInput;
let EditMockExamCategoryOutput = class EditMockExamCategoryOutput extends output_dto_1.CoreOutput {
};
EditMockExamCategoryOutput = __decorate([
    (0, graphql_1.ObjectType)()
], EditMockExamCategoryOutput);
exports.EditMockExamCategoryOutput = EditMockExamCategoryOutput;
//# sourceMappingURL=editCategory.dto.js.map