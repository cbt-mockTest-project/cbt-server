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
exports.FindMyExamHistoryOutput = exports.FindMyExamHistoryInput = exports.TitleAndId = void 0;
const output_dto_1 = require("./../../common/dtos/output.dto");
const graphql_1 = require("@nestjs/graphql");
let TitleAndId = class TitleAndId {
};
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], TitleAndId.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], TitleAndId.prototype, "title", void 0);
TitleAndId = __decorate([
    (0, graphql_1.ObjectType)()
], TitleAndId);
exports.TitleAndId = TitleAndId;
let FindMyExamHistoryInput = class FindMyExamHistoryInput {
};
__decorate([
    (0, graphql_1.Field)(() => [Number]),
    __metadata("design:type", Array)
], FindMyExamHistoryInput.prototype, "categoryIds", void 0);
FindMyExamHistoryInput = __decorate([
    (0, graphql_1.InputType)()
], FindMyExamHistoryInput);
exports.FindMyExamHistoryInput = FindMyExamHistoryInput;
let FindMyExamHistoryOutput = class FindMyExamHistoryOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => [TitleAndId], { nullable: true }),
    __metadata("design:type", Array)
], FindMyExamHistoryOutput.prototype, "titleAndId", void 0);
FindMyExamHistoryOutput = __decorate([
    (0, graphql_1.ObjectType)()
], FindMyExamHistoryOutput);
exports.FindMyExamHistoryOutput = FindMyExamHistoryOutput;
//# sourceMappingURL=findMyExamHistory.dto.js.map