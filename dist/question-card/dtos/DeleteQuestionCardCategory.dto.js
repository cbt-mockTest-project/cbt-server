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
exports.DeleteQuestionCardCategoryOutput = exports.DeleteQuestionCardCategoryInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
let DeleteQuestionCardCategoryInput = class DeleteQuestionCardCategoryInput {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], DeleteQuestionCardCategoryInput.prototype, "id", void 0);
DeleteQuestionCardCategoryInput = __decorate([
    (0, graphql_1.InputType)()
], DeleteQuestionCardCategoryInput);
exports.DeleteQuestionCardCategoryInput = DeleteQuestionCardCategoryInput;
let DeleteQuestionCardCategoryOutput = class DeleteQuestionCardCategoryOutput extends output_dto_1.CoreOutput {
};
DeleteQuestionCardCategoryOutput = __decorate([
    (0, graphql_1.ObjectType)()
], DeleteQuestionCardCategoryOutput);
exports.DeleteQuestionCardCategoryOutput = DeleteQuestionCardCategoryOutput;
//# sourceMappingURL=DeleteQuestionCardCategory.dto.js.map