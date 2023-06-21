import { CoreOutput } from 'src/common/dtos/output.dto';
import { Notice } from '../entities/notice.entity';
declare const CreateNoticeInput_base: import("@nestjs/common").Type<Pick<Notice, "content" | "reservationTime" | "link">>;
export declare class CreateNoticeInput extends CreateNoticeInput_base {
    userId: number;
}
export declare class CreateNoticeOutput extends CoreOutput {
}
export {};
