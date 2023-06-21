import { CoreOutput } from './../../common/dtos/output.dto';
import { Post, PostCategory } from './../entities/post.entity';
declare const CreatePostInput_base: import("@nestjs/common").Type<Pick<Post, "content" | "title">>;
export declare class CreatePostInput extends CreatePostInput_base {
    category?: PostCategory;
}
export declare class CreatePostOutput extends CoreOutput {
}
export {};
