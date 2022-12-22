"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMockExamCategoryOutput = exports.DeleteMockExamCategoryInput = void 0;
const output_dto_1 = require("./../../common/dtos/output.dto");
const mock_exam_category_entity_1 = require("./../entities/mock-exam-category.entity");
const graphql_1 = require("@nestjs/graphql");
let DeleteMockExamCategoryInput = class DeleteMockExamCategoryInput extends (0, graphql_1.PickType)(mock_exam_category_entity_1.MockExamCategory, [
    'id',
]) {
};
DeleteMockExamCategoryInput = __decorate([
    (0, graphql_1.InputType)()
], DeleteMockExamCategoryInput);
exports.DeleteMockExamCategoryInput = DeleteMockExamCategoryInput;
let DeleteMockExamCategoryOutput = class DeleteMockExamCategoryOutput extends output_dto_1.CoreOutput {
};
DeleteMockExamCategoryOutput = __decorate([
    (0, graphql_1.ObjectType)()
], DeleteMockExamCategoryOutput);
exports.DeleteMockExamCategoryOutput = DeleteMockExamCategoryOutput;
//# sourceMappingURL=deleteCategory.dto.js.map