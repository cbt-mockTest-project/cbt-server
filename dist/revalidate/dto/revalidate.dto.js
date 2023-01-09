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
exports.RevalidateOutput = exports.RevalidateInput = void 0;
const output_dto_1 = require("../../common/dtos/output.dto");
const graphql_1 = require("@nestjs/graphql");
let RevalidateInput = class RevalidateInput {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], RevalidateInput.prototype, "path", void 0);
RevalidateInput = __decorate([
    (0, graphql_1.InputType)()
], RevalidateInput);
exports.RevalidateInput = RevalidateInput;
let RevalidateOutput = class RevalidateOutput extends output_dto_1.CoreOutput {
};
RevalidateOutput = __decorate([
    (0, graphql_1.ObjectType)()
], RevalidateOutput);
exports.RevalidateOutput = RevalidateOutput;
//# sourceMappingURL=revalidate.dto.js.map