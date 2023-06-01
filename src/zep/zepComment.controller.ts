import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ZepCommentService } from './zepComment.service';
import { CreateZepCommentInput } from './dtos/zepComment/createZepComment.dto';
import { UpdateZepCommentInput } from './dtos/zepComment/updateZepComment.dto';
import { DeleteZepCommentInput } from './dtos/zepComment/deleteZepComment.dto';

@Controller('zep/comment')
export class ZepCommentController {
  constructor(private readonly zepCommentService: ZepCommentService) {}

  @Post('')
  async createZepComment(@Body() createZepCommentInput: CreateZepCommentInput) {
    return this.zepCommentService.createZepComment(createZepCommentInput);
  }

  @Post('/:id')
  async updateZepComment(
    @Body() updateZepCommentInput: UpdateZepCommentInput,
    @Param('id') id: string,
  ) {
    return this.zepCommentService.updateZepComment(id, updateZepCommentInput);
  }

  @Post('delete/:id')
  async deleteZepComment(
    @Param('id') id: string,
    @Body() deleteZepCommentInput: DeleteZepCommentInput,
  ) {
    return this.zepCommentService.deleteZepComment(id, deleteZepCommentInput);
  }
}
