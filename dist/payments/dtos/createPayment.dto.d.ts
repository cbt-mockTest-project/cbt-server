import { Payment } from '../entities/payment.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';
declare const CreatePaymentInput_base: import("@nestjs/common").Type<Pick<Payment, "orderId" | "price" | "productName" | "receiptId">>;
export declare class CreatePaymentInput extends CreatePaymentInput_base {
}
export declare class CreatePaymentOutput extends CoreOutput {
    payment?: Payment;
}
export {};
