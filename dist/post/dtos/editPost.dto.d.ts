import { CoreOutput } from '../../common/dtos/output.dto';
import { Post } from '../entities/post.entity';
declare const EditPostInput_base: import("@nestjs/common").Type<Pick<Post, "id">>;
export declare class EditPostInput extends EditPostInput_base {
    content?: string;
    title?: string;
}
export declare class EditPostOutput extends CoreOutput {
    title?: string;
    content?: string;
}
export {};
