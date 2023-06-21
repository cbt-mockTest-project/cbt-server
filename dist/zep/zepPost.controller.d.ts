import { ZepPostService } from './zepPost.service';
import { CreateZepPostInput, CreateZepPostOutput } from './dtos/zepPost/createZepPost.dto';
import { GetZepPostsInput, GetZepPostsOutput } from './dtos/zepPost/getZepPosts.dto';
import { GetZepPostOutput } from './dtos/zepPost/getZepPost.dto';
import { UpdateZepPostInput, UpdateZepPostOutput } from './dtos/zepPost/updateZepPost.dto';
import { DeleteZepPostInput, DeleteZepPostOutput } from './dtos/zepPost/deleteZepPost.dto';
export declare class ZepPostController {
    private readonly zepPostService;
    constructor(zepPostService: ZepPostService);
    createZepPost(createZepPostInput: CreateZepPostInput): Promise<CreateZepPostOutput>;
    getZepPosts(getZepPostsInput: GetZepPostsInput): Promise<GetZepPostsOutput>;
    getZepPost(id: string): Promise<GetZepPostOutput>;
    updateZepPost(id: string, updateZepPostInput: UpdateZepPostInput): Promise<UpdateZepPostOutput>;
    deleteZepPost(deleteZepPostInput: DeleteZepPostInput, id: string): Promise<DeleteZepPostOutput>;
}
