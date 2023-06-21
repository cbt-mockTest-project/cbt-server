import { ViewPostOutput, ViewPostInput } from './dtos/viewPost.dto';
import { ReadPostInput, ReadPostOutput } from './dtos/readPost.dto';
import { User } from 'src/users/entities/user.entity';
import { PostService } from './post.service';
import { CreatePostInput, CreatePostOutput } from './dtos/createPost.dto';
import { EditPostInput, EditPostOutput } from './dtos/editPost.dto';
import { DeletePostInput, DeletePostOutput } from './dtos/deletePost.dto';
import { ReadPostsInput } from './dtos/readPosts.dto';
export declare class PostResolver {
    private readonly postService;
    constructor(postService: PostService);
    createPost(createPostInput: CreatePostInput, user: User): Promise<CreatePostOutput>;
    editPost(editPostInput: EditPostInput, user: User): Promise<EditPostOutput>;
    deletePost(deletePostInput: DeletePostInput, user: User): Promise<DeletePostOutput>;
    viewPost(viewPostInput: ViewPostInput): Promise<ViewPostOutput>;
    readPost(readPostInput: ReadPostInput, user: User): Promise<ReadPostOutput>;
    readPosts(readPostsInput: ReadPostsInput): Promise<ReadPostOutput>;
}
