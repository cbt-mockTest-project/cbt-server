import { CoreOutput } from './../../common/dtos/output.dto';
import { Post, PostCategory } from './../entities/post.entity';
export declare class ReadPostsInput {
    page: number;
    limit: number;
    category: PostCategory;
    all: boolean;
    search?: string;
}
export declare class ReadPostsOutput extends CoreOutput {
    posts?: Post[];
    count?: number;
}
