import { CoreOutput } from 'src/common/dtos/output.dto';
import { ZepPost } from 'src/zep/entities/zepPost.entity';
export declare class GetZepPostInput {
    postId: number;
}
export declare class GetZepPostOutput extends CoreOutput {
    post?: ZepPost;
}
