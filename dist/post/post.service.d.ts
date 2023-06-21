import { RevalidateService } from './../revalidate/revalidate.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostInput, CreatePostOutput } from './dtos/createPost.dto';
import { DeletePostInput, DeletePostOutput } from './dtos/deletePost.dto';
import { EditPostInput, EditPostOutput } from './dtos/editPost.dto';
import { ReadPostInput, ReadPostOutput } from './dtos/readPost.dto';
import { ReadPostsInput, ReadPostsOutput } from './dtos/readPosts.dto';
import { ViewPostInput, ViewPostOutput } from './dtos/viewPost.dto';
import { Post } from './entities/post.entity';
export declare class PostService {
    private readonly post;
    private readonly revalidateService;
    constructor(post: Repository<Post>, revalidateService: RevalidateService);
    createPost(createPostInput: CreatePostInput, user: User): Promise<CreatePostOutput>;
    editPost(editPostInput: EditPostInput, user: User): Promise<EditPostOutput>;
    deletePost(deletePostInput: DeletePostInput, user: User): Promise<DeletePostOutput>;
    readPost(readPostInput: ReadPostInput, user: User): Promise<ReadPostOutput>;
    readPosts(readPostsInput: ReadPostsInput): Promise<ReadPostsOutput>;
    viewPost(viewPostInput: ViewPostInput): Promise<ViewPostOutput>;
}
