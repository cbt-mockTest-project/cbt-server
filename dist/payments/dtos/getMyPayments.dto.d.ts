import { CoreOutput } from 'src/common/dtos/output.dto';
import { Payment } from '../entities/payment.entity';
export declare class GetMyPaymentsInput {
}
export declare class GetMyPaymentsOutput extends CoreOutput {
    payments?: Payment[];
}
