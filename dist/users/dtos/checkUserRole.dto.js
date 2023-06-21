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
exports.CheckUserRoleOutput = exports.CheckUserRoleInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
let CheckUserRoleInput = class CheckUserRoleInput {
};
__decorate([
    (0, graphql_1.Field)(() => [Number]),
    __metadata("design:type", Array)
], CheckUserRoleInput.prototype, "roleIds", void 0);
CheckUserRoleInput = __decorate([
    (0, graphql_1.InputType)()
], CheckUserRoleInput);
exports.CheckUserRoleInput = CheckUserRoleInput;
let CheckUserRoleOutput = class CheckUserRoleOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], CheckUserRoleOutput.prototype, "confirmed", void 0);
CheckUserRoleOutput = __decorate([
    (0, graphql_1.ObjectType)()
], CheckUserRoleOutput);
exports.CheckUserRoleOutput = CheckUserRoleOutput;
//# sourceMappingURL=checkUserRole.dto.js.map