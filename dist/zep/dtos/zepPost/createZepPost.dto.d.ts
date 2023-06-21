import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepPost, ZepPostCategory } from 'src/zep/entities/zepPost.entity';
export declare class CreateZepPostInput {
    userId: string;
    title: string;
    content: string;
    category?: ZepPostCategory;
}
export declare class CreateZepPostOutput extends CoreOutput {
    post?: ZepPost;
}
