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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("./entities/payment.entity");
const user_entity_1 = require("../users/entities/user.entity");
const backend_js_1 = require("@bootpay/backend-js");
let PaymentService = class PaymentService {
    constructor(payments, users) {
        this.payments = payments;
        this.users = users;
    }
    async getMyPayments(user) {
        try {
            const payments = await this.payments.find({
                where: {
                    user: {
                        id: user.id,
                    },
                },
            });
            return {
                ok: true,
                payments,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Could not get payments',
            };
        }
    }
    async deletePayment(deletePaymentInput, user) {
        try {
            const { paymentId } = deletePaymentInput;
            const payment = await this.payments.findOne({
                where: {
                    id: paymentId,
                },
                relations: {
                    user: true,
                },
            });
            if (!payment) {
                return {
                    ok: false,
                    error: 'Payment not found',
                };
            }
            if (user.id !== payment.user.id) {
                return {
                    ok: false,
                    error: 'Not authorized',
                };
            }
            await this.payments.delete(paymentId);
            return {
                ok: true,
            };
        }
        catch (_a) {
            return {
                ok: false,
                error: 'Could not delete payment',
            };
        }
    }
    async createPayment(createPaymentInput, user, queryRunner) {
        try {
            const { orderId, productName, receiptId, price } = createPaymentInput;
            backend_js_1.Bootpay.setConfiguration({
                application_id: process.env.BOOTPAY_APPLICATION_KEY,
                private_key: process.env.BOOTPAY_PRIVATE_KEY,
            });
            await backend_js_1.Bootpay.getAccessToken();
            const { receipt_url } = await backend_js_1.Bootpay.receiptPayment(receiptId);
            const newPayment = this.payments.create({
                orderId,
                productName,
                receiptId,
                price,
                user,
                receiptUrl: receipt_url,
            });
            let payment;
            if (queryRunner) {
                payment = await queryRunner.manager.save(newPayment);
            }
            else {
                payment = await this.payments.save(newPayment);
            }
            return {
                ok: true,
                payment,
            };
        }
        catch (error) {
            if (queryRunner) {
                await queryRunner.rollbackTransaction();
            }
            return {
                ok: false,
                error: 'Could not create payment',
            };
        }
    }
    async updatePayment(updatePaymentInput) {
        try {
            backend_js_1.Bootpay.setConfiguration({
                application_id: process.env.BOOTPAY_APPLICATION_KEY,
                private_key: process.env.BOOTPAY_PRIVATE_KEY,
            });
            await backend_js_1.Bootpay.getAccessToken();
            const { receiptId, paymentId } = updatePaymentInput;
            const { receipt_url } = await backend_js_1.Bootpay.receiptPayment(receiptId);
            const payment = await this.payments.findOne({ where: { id: paymentId } });
            if (!payment) {
                return {
                    ok: false,
                    error: 'Payment not found',
                };
            }
            await this.payments.save({
                id: paymentId,
                receiptUrl: receipt_url,
            });
            return {
                ok: true,
            };
        }
        catch (e) {
            return {
                ok: false,
                error: 'Could not update payment',
            };
        }
    }
};
PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map