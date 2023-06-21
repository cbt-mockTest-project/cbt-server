import { CreatePaymentInput } from 'src/payments/dtos/createPayment.dto';
import { ChangeClientRoleInput } from './changeClientRole.dto';
import { CoreOutput } from 'src/common/dtos/output.dto';
export declare class ChangeClientRoleAndCreatePaymentInput {
    createPaymentInput: CreatePaymentInput;
    changeClientRoleInput: ChangeClientRoleInput;
}
export declare class ChangeClientRoleAndCreatePaymentOutput extends CoreOutput {
    paymentId?: number;
}
