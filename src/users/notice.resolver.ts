import { CreateNoticeOutput, CreateNoticeInput } from './dtos/createNotice.dto';
import { Notice } from './entities/notice.entity';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { NoticeService } from './notice.service';
import { Role } from 'src/auth/role.decorators';
import { EditNoticeInput, EditNoticeOutput } from './dtos/editNotice.dto';

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
}
