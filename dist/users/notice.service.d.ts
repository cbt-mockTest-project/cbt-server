import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from 'src/users/entities/user.entity';
import { Notice } from './entities/notice.entity';
import { Repository } from 'typeorm';
import { CreateNoticeInput, CreateNoticeOutput } from './dtos/createNotice.dto';
import { EditNoticeInput, EditNoticeOutput } from './dtos/editNotice.dto';
import { ReadMyNoticeOutput } from './dtos/readMyNotice.dto';
import { DeleteNoticeInput, DeleteNoticeOutput } from './dtos/deleteNotice.dto';
export declare class NoticeService {
    private readonly notice;
    private readonly user;
    constructor(notice: Repository<Notice>, user: Repository<User>);
    createNotice(createNoticeInput: CreateNoticeInput): Promise<CreateNoticeOutput>;
    editNotice(editNoticeInput: EditNoticeInput): Promise<EditNoticeOutput>;
    deleteNotice(deleteNoticeInput: DeleteNoticeInput): Promise<DeleteNoticeOutput>;
    readMyNotice(user: User): Promise<ReadMyNoticeOutput>;
    deleteAllNoticesOfMe(user: User): Promise<CoreOutput>;
}
