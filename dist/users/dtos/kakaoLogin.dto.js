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
exports.KakaoLoginOutput = exports.KakaoLoginInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
let KakaoLoginInput = class KakaoLoginInput {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], KakaoLoginInput.prototype, "code", void 0);
KakaoLoginInput = __decorate([
    (0, graphql_1.InputType)()
], KakaoLoginInput);
exports.KakaoLoginInput = KakaoLoginInput;
let KakaoLoginOutput = class KakaoLoginOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], KakaoLoginOutput.prototype, "token", void 0);
KakaoLoginOutput = __decorate([
    (0, graphql_1.ObjectType)()
], KakaoLoginOutput);
exports.KakaoLoginOutput = KakaoLoginOutput;
//# sourceMappingURL=kakaoLogin.dto.js.map