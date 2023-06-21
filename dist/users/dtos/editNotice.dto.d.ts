import { CoreOutput } from 'src/common/dtos/output.dto';
import { Notice } from '../entities/notice.entity';
declare const EditNoticeInput_base: import("@nestjs/common").Type<Partial<Pick<Notice, keyof Notice>>>;
export declare class EditNoticeInput extends EditNoticeInput_base {
    noticeId: number;
}
export declare class EditNoticeOutput extends CoreOutput {
}
export {};
