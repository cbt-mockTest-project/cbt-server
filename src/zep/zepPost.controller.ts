import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ZepPostService } from './zepPost.service';
import {
  CreateZepPostInput,
  CreateZepPostOutput,
} from './dtos/zepPost/createZepPost.dto';
import {
  GetZepPostsInput,
  GetZepPostsOutput,
} from './dtos/zepPost/getZepPosts.dto';
import { GetZepPostOutput } from './dtos/zepPost/getZepPost.dto';
import {
  UpdateZepPostInput,
  UpdateZepPostOutput,
} from './dtos/zepPost/updateZepPost.dto';
import {
  DeleteZepPostInput,
  DeleteZepPostOutput,
} from './dtos/zepPost/deleteZepPost.dto';

@Controller('zep/post')
export class ZepPostController {
  constructor(private readonly zepPostService: ZepPostService) {}

  @Post('')
  async createZepPost(
    @Body() createZepPostInput: CreateZepPostInput,
  ): Promise<CreateZepPostOutput> {
    return this.zepPostService.createZepPost(createZepPostInput);
  }

  @Get('')
  async getZepPosts(
    @Query() getZepPostsInput: GetZepPostsInput,
  ): Promise<GetZepPostsOutput> {
    return this.zepPostService.getZepPosts(getZepPostsInput);
  }

  @Get('/:id')
  async getZepPost(@Param('id') id: string): Promise<GetZepPostOutput> {
    return this.zepPostService.getZepPost(id);
  }

  @Post('/:id')
  async updateZepPost(
    @Param('id') id: string,
    @Body() updateZepPostInput: UpdateZepPostInput,
  ): Promise<UpdateZepPostOutput> {
    return this.zepPostService.updateZepPost(id, updateZepPostInput);
  }

  @Post('delete/:id')
  async deleteZepPost(
    @Body() deleteZepPostInput: DeleteZepPostInput,
    @Param('id') id: string,
  ): Promise<DeleteZepPostOutput> {
    return this.zepPostService.deleteZepPost(id, deleteZepPostInput);
  }
}
