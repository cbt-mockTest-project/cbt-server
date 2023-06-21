import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepPost, ZepPostCategory } from 'src/zep/entities/zepPost.entity';
export declare class UpdateZepPostInput {
    title?: string;
    content?: string;
    category?: ZepPostCategory;
    userId: string;
}
export declare class UpdateZepPostOutput extends CoreOutput {
    post?: ZepPost;
}
