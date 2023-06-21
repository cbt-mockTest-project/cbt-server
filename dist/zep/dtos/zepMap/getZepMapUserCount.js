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
exports.GetZepMapUserCountOutput = exports.GetZepMapUserCountInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../../common/dtos/output.dto");
const zepMapUserCount_entity_1 = require("../../entities/zepMapUserCount.entity");
let GetZepMapUserCountInput = class GetZepMapUserCountInput {
};
GetZepMapUserCountInput = __decorate([
    (0, graphql_1.InputType)()
], GetZepMapUserCountInput);
exports.GetZepMapUserCountInput = GetZepMapUserCountInput;
let GetZepMapUserCountOutput = class GetZepMapUserCountOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => [zepMapUserCount_entity_1.ZepMapUserCount], { nullable: true }),
    __metadata("design:type", Array)
], GetZepMapUserCountOutput.prototype, "zepMapUserCount", void 0);
GetZepMapUserCountOutput = __decorate([
    (0, graphql_1.ObjectType)()
], GetZepMapUserCountOutput);
exports.GetZepMapUserCountOutput = GetZepMapUserCountOutput;
//# sourceMappingURL=getZepMapUserCount.js.map