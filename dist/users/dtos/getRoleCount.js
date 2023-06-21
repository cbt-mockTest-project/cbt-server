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
exports.GetRoleCountOutput = exports.GetRoleCountInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
let GetRoleCountInput = class GetRoleCountInput {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], GetRoleCountInput.prototype, "roleId", void 0);
GetRoleCountInput = __decorate([
    (0, graphql_1.InputType)()
], GetRoleCountInput);
exports.GetRoleCountInput = GetRoleCountInput;
let GetRoleCountOutput = class GetRoleCountOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], GetRoleCountOutput.prototype, "count", void 0);
GetRoleCountOutput = __decorate([
    (0, graphql_1.ObjectType)()
], GetRoleCountOutput);
exports.GetRoleCountOutput = GetRoleCountOutput;
//# sourceMappingURL=getRoleCount.js.map