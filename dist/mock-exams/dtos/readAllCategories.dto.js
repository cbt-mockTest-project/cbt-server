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
exports.ReadAllMockExamCategoriesOutput = exports.ReadAllMockExamCategoriesInput = void 0;
const mock_exam_category_entity_1 = require("./../entities/mock-exam-category.entity");
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
let ReadAllMockExamCategoriesInput = class ReadAllMockExamCategoriesInput extends (0, graphql_1.PartialType)((0, graphql_1.PickType)(mock_exam_category_entity_1.MockExamCategory, ['type'])) {
};
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], ReadAllMockExamCategoriesInput.prototype, "partnerId", void 0);
ReadAllMockExamCategoriesInput = __decorate([
    (0, graphql_1.InputType)()
], ReadAllMockExamCategoriesInput);
exports.ReadAllMockExamCategoriesInput = ReadAllMockExamCategoriesInput;
let ReadAllMockExamCategoriesOutput = class ReadAllMockExamCategoriesOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => [mock_exam_category_entity_1.MockExamCategory], { defaultValue: [] }),
    __metadata("design:type", Array)
], ReadAllMockExamCategoriesOutput.prototype, "categories", void 0);
ReadAllMockExamCategoriesOutput = __decorate([
    (0, graphql_1.ObjectType)()
], ReadAllMockExamCategoriesOutput);
exports.ReadAllMockExamCategoriesOutput = ReadAllMockExamCategoriesOutput;
//# sourceMappingURL=readAllCategories.dto.js.map