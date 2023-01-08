import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from 'src/users/entities/user.entity';
import { DeleteNoticeInput, DeleteNoticeOutput } from './dtos/deleteNotice.dto';
import { CreateNoticeOutput, CreateNoticeInput } from './dtos/createNotice.dto';
import { Notice } from './entities/notice.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { NoticeService } from './notice.service';
import { Role } from 'src/auth/role.decorators';
import { EditNoticeInput, EditNoticeOutput } from './dtos/editNotice.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';

@Resolver(() => Notice)
export class NoticeResolver {
  constructor(private readonly noticeService: NoticeService) {}

  @Role(['ADMIN'])
  @Mutation(() => CreateNoticeOutput)
  async createNotice(
    @Args('input')
    createNoticeInput: CreateNoticeInput,
  ): Promise<CreateNoticeOutput> {
    return this.noticeService.createNotice(createNoticeInput);
  }

  @Role(['ADMIN'])
  @Mutation(() => EditNoticeOutput)
  async editNotice(
    @Args('input')
    editNoticeInput: EditNoticeInput,
  ): Promise<EditNoticeOutput> {
    return this.noticeService.editNotice(editNoticeInput);
  }

  @Role(['ANY'])
  @Mutation(() => DeleteNoticeOutput)
  async deleteNotice(
    @Args('input')
    deleteNoticeInput: DeleteNoticeInput,
  ): Promise<DeleteNoticeOutput> {
    return this.noticeService.deleteNotice(deleteNoticeInput);
  }

  @Role(['ANY'])
  @Mutation(() => CoreOutput)
  async deleteAllNoticesOfMe(@AuthUser() user: User): Promise<CoreOutput> {
    return this.noticeService.deleteAllNoticesOfMe(user);
  }
}
