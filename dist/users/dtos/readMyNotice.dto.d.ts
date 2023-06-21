import { Notice } from './../entities/notice.entity';
import { CoreOutput } from './../../common/dtos/output.dto';
export declare class ReadMyNoticeOutput extends CoreOutput {
    notices?: Notice[];
}
