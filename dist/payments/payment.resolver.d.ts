import { PaymentService } from './payment.service';
import { UpdatePaymentInput, UpdatePaymentOutput } from './dtos/updatePayment.dto';
import { DeletePaymentInput, DeletePaymentOutput } from './dtos/deletePayment.dto';
import { User } from 'src/users/entities/user.entity';
import { GetMyPaymentsOutput } from './dtos/getMyPayments.dto';
import { CreatePaymentInput, CreatePaymentOutput } from './dtos/createPayment.dto';
export declare class PaymentResolver {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    updatePayment(updatePaymentInput: UpdatePaymentInput): Promise<UpdatePaymentOutput>;
    deletePayment(user: User, deletePaymentInput: DeletePaymentInput): Promise<DeletePaymentOutput>;
    getMyPayments(user: User): Promise<GetMyPaymentsOutput>;
    createPayment(user: User, createPaymentInput: CreatePaymentInput): Promise<CreatePaymentOutput>;
}
