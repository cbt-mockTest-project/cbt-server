import { CoreOutput } from 'src/common/dtos/output.dto';
import { Feedback } from '../entities/feedback.entity';
declare const CreateFeedbackInput_base: import("@nestjs/common").Type<Pick<Feedback, "content">>;
export declare class CreateFeedbackInput extends CreateFeedbackInput_base {
}
export declare class CreateFeedbackOutput extends CoreOutput {
}
export {};
