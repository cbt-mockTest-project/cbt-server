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
exports.EmailVerificationOutput = exports.EmailVerificationInput = void 0;
const output_dto_1 = require("./../../common/dtos/output.dto");
const graphql_1 = require("@nestjs/graphql");
const verification_entity_1 = require("../entities/verification.entity");
let EmailVerificationInput = class EmailVerificationInput extends (0, graphql_1.PickType)(verification_entity_1.Verification, ['code']) {
};
EmailVerificationInput = __decorate([
    (0, graphql_1.InputType)()
], EmailVerificationInput);
exports.EmailVerificationInput = EmailVerificationInput;
let EmailVerificationOutput = class EmailVerificationOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], EmailVerificationOutput.prototype, "email", void 0);
EmailVerificationOutput = __decorate([
    (0, graphql_1.ObjectType)()
], EmailVerificationOutput);
exports.EmailVerificationOutput = EmailVerificationOutput;
//# sourceMappingURL=EmailVerification.dto.js.map