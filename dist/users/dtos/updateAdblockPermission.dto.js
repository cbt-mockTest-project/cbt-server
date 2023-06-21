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
exports.UpdateAdblockPermissionOutput = exports.UpdateAdblockPermissionInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
let UpdateAdblockPermissionInput = class UpdateAdblockPermissionInput {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], UpdateAdblockPermissionInput.prototype, "userId", void 0);
UpdateAdblockPermissionInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateAdblockPermissionInput);
exports.UpdateAdblockPermissionInput = UpdateAdblockPermissionInput;
let UpdateAdblockPermissionOutput = class UpdateAdblockPermissionOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], UpdateAdblockPermissionOutput.prototype, "adblockPermission", void 0);
UpdateAdblockPermissionOutput = __decorate([
    (0, graphql_1.ObjectType)()
], UpdateAdblockPermissionOutput);
exports.UpdateAdblockPermissionOutput = UpdateAdblockPermissionOutput;
//# sourceMappingURL=updateAdblockPermission.dto.js.map