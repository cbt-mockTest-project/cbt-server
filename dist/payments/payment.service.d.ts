import { QueryRunner, Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { User } from 'src/users/entities/user.entity';
import { CreatePaymentInput, CreatePaymentOutput } from './dtos/createPayment.dto';
import { UpdatePaymentInput, UpdatePaymentOutput } from './dtos/updatePayment.dto';
import { GetMyPaymentsOutput } from './dtos/getMyPayments.dto';
import { DeletePaymentInput, DeletePaymentOutput } from './dtos/deletePayment.dto';
export declare class PaymentService {
    private readonly payments;
    private readonly users;
    constructor(payments: Repository<Payment>, users: Repository<User>);
    getMyPayments(user: User): Promise<GetMyPaymentsOutput>;
    deletePayment(deletePaymentInput: DeletePaymentInput, user: User): Promise<DeletePaymentOutput>;
    createPayment(createPaymentInput: CreatePaymentInput, user: User, queryRunner?: QueryRunner): Promise<CreatePaymentOutput>;
    updatePayment(updatePaymentInput: UpdatePaymentInput): Promise<UpdatePaymentOutput>;
}
