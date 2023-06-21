import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepPost, ZepPostCategory } from 'src/zep/entities/zepPost.entity';
export declare class GetZepPostsInput {
    category?: ZepPostCategory;
    page: string;
    limit: string;
}
export declare class GetZepPostsOutput extends CoreOutput {
    posts?: ZepPost[];
    total?: number;
}
