import { CoreOutput } from 'src/common/dtos/output.dto';
export declare class KakaoLoginInput {
    code: string;
}
export declare class KakaoLoginOutput extends CoreOutput {
    token?: string;
}
