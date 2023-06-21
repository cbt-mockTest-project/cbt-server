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
exports.ChangeClientRoleAndCreatePaymentOutput = exports.ChangeClientRoleAndCreatePaymentInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const createPayment_dto_1 = require("../../payments/dtos/createPayment.dto");
const changeClientRole_dto_1 = require("./changeClientRole.dto");
const output_dto_1 = require("../../common/dtos/output.dto");
let ChangeClientRoleAndCreatePaymentInput = class ChangeClientRoleAndCreatePaymentInput {
};
__decorate([
    (0, graphql_1.Field)(() => createPayment_dto_1.CreatePaymentInput),
    __metadata("design:type", createPayment_dto_1.CreatePaymentInput)
], ChangeClientRoleAndCreatePaymentInput.prototype, "createPaymentInput", void 0);
__decorate([
    (0, graphql_1.Field)(() => changeClientRole_dto_1.ChangeClientRoleInput),
    __metadata("design:type", changeClientRole_dto_1.ChangeClientRoleInput)
], ChangeClientRoleAndCreatePaymentInput.prototype, "changeClientRoleInput", void 0);
ChangeClientRoleAndCreatePaymentInput = __decorate([
    (0, graphql_1.InputType)()
], ChangeClientRoleAndCreatePaymentInput);
exports.ChangeClientRoleAndCreatePaymentInput = ChangeClientRoleAndCreatePaymentInput;
let ChangeClientRoleAndCreatePaymentOutput = class ChangeClientRoleAndCreatePaymentOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], ChangeClientRoleAndCreatePaymentOutput.prototype, "paymentId", void 0);
ChangeClientRoleAndCreatePaymentOutput = __decorate([
    (0, graphql_1.ObjectType)()
], ChangeClientRoleAndCreatePaymentOutput);
exports.ChangeClientRoleAndCreatePaymentOutput = ChangeClientRoleAndCreatePaymentOutput;
//# sourceMappingURL=changeClientRoleAndCreatePayment.dto.js.map