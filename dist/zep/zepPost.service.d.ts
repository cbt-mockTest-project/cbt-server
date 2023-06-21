import { ZepPost } from './entities/zepPost.entity';
import { Repository } from 'typeorm';
import { ZepUser } from './entities/zepUser.entity';
import { CreateZepPostInput, CreateZepPostOutput } from './dtos/zepPost/createZepPost.dto';
import { GetZepPostsInput, GetZepPostsOutput } from './dtos/zepPost/getZepPosts.dto';
import { GetZepPostOutput } from './dtos/zepPost/getZepPost.dto';
import { UpdateZepPostInput, UpdateZepPostOutput } from './dtos/zepPost/updateZepPost.dto';
import { DeleteZepPostInput, DeleteZepPostOutput } from './dtos/zepPost/deleteZepPost.dto';
export declare class ZepPostService {
    private readonly zepPost;
    private readonly zepUser;
    constructor(zepPost: Repository<ZepPost>, zepUser: Repository<ZepUser>);
    createZepPost(createZepPostInput: CreateZepPostInput): Promise<CreateZepPostOutput>;
    getZepPosts(getZepPostsInput: GetZepPostsInput): Promise<GetZepPostsOutput>;
    getZepPost(postId: string): Promise<GetZepPostOutput>;
    updateZepPost(postId: string, updateZepPostInput: UpdateZepPostInput): Promise<UpdateZepPostOutput>;
    deleteZepPost(postId: string, deleteZepPostInput: DeleteZepPostInput): Promise<DeleteZepPostOutput>;
}
