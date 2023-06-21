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
exports.CreatePaymentOutput = exports.CreatePaymentInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const payment_entity_1 = require("../entities/payment.entity");
const output_dto_1 = require("../../common/dtos/output.dto");
let CreatePaymentInput = class CreatePaymentInput extends (0, graphql_1.PickType)(payment_entity_1.Payment, [
    'price',
    'orderId',
    'productName',
    'receiptId',
]) {
};
CreatePaymentInput = __decorate([
    (0, graphql_1.InputType)()
], CreatePaymentInput);
exports.CreatePaymentInput = CreatePaymentInput;
let CreatePaymentOutput = class CreatePaymentOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)((type) => payment_entity_1.Payment, { nullable: true }),
    __metadata("design:type", payment_entity_1.Payment)
], CreatePaymentOutput.prototype, "payment", void 0);
CreatePaymentOutput = __decorate([
    (0, graphql_1.ObjectType)()
], CreatePaymentOutput);
exports.CreatePaymentOutput = CreatePaymentOutput;
//# sourceMappingURL=createPayment.dto.js.map