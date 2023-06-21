import { CoreOutput } from '../../common/dtos/output.dto';
import { Post } from '../entities/post.entity';
declare const DeletePostInput_base: import("@nestjs/common").Type<Pick<Post, "id">>;
export declare class DeletePostInput extends DeletePostInput_base {
}
export declare class DeletePostOutput extends CoreOutput {
}
export {};
