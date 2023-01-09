import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from 'src/users/entities/user.entity';
import { DeleteNoticeInput, DeleteNoticeOutput } from './dtos/deleteNotice.dto';
import { CreateNoticeOutput, CreateNoticeInput } from './dtos/createNotice.dto';
import { NoticeService } from './notice.service';
import { EditNoticeInput, EditNoticeOutput } from './dtos/editNotice.dto';
export declare class NoticeResolver {
    private readonly noticeService;
    constructor(noticeService: NoticeService);
    createNotice(createNoticeInput: CreateNoticeInput): Promise<CreateNoticeOutput>;
    editNotice(editNoticeInput: EditNoticeInput): Promise<EditNoticeOutput>;
    deleteNotice(deleteNoticeInput: DeleteNoticeInput): Promise<DeleteNoticeOutput>;
    deleteAllNoticesOfMe(user: User): Promise<CoreOutput>;
}
