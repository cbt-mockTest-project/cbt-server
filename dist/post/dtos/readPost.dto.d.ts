import { CoreOutput } from './../../common/dtos/output.dto';
import { Post } from './../entities/post.entity';
declare const ReadPostInput_base: import("@nestjs/common").Type<Pick<Post, "id">>;
export declare class ReadPostInput extends ReadPostInput_base {
}
export declare class ReadPostOutput extends CoreOutput {
    post?: Post;
}
export {};
