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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const payment_entity_1 = require("./entities/payment.entity");
const payment_service_1 = require("./payment.service");
const updatePayment_dto_1 = require("./dtos/updatePayment.dto");
const role_decorators_1 = require("../auth/role.decorators");
const deletePayment_dto_1 = require("./dtos/deletePayment.dto");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const user_entity_1 = require("../users/entities/user.entity");
const getMyPayments_dto_1 = require("./dtos/getMyPayments.dto");
const createPayment_dto_1 = require("./dtos/createPayment.dto");
let PaymentResolver = class PaymentResolver {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async updatePayment(updatePaymentInput) {
        return this.paymentService.updatePayment(updatePaymentInput);
    }
    async deletePayment(user, deletePaymentInput) {
        return this.paymentService.deletePayment(deletePaymentInput, user);
    }
    async getMyPayments(user) {
        return this.paymentService.getMyPayments(user);
    }
    async createPayment(user, createPaymentInput) {
        return this.paymentService.createPayment(createPaymentInput, user);
    }
};
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => updatePayment_dto_1.UpdatePaymentOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updatePayment_dto_1.UpdatePaymentInput]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "updatePayment", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => deletePayment_dto_1.DeletePaymentOutput),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        deletePayment_dto_1.DeletePaymentInput]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "deletePayment", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Query)(() => getMyPayments_dto_1.GetMyPaymentsOutput),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "getMyPayments", null);
__decorate([
    (0, role_decorators_1.Role)(['ANY']),
    (0, graphql_1.Mutation)(() => createPayment_dto_1.CreatePaymentOutput),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        createPayment_dto_1.CreatePaymentInput]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "createPayment", null);
PaymentResolver = __decorate([
    (0, graphql_1.Resolver)(() => payment_entity_1.Payment),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentResolver);
exports.PaymentResolver = PaymentResolver;
//# sourceMappingURL=payment.resolver.js.map