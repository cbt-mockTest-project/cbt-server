import { CoreOutput } from 'src/common/dtos/output.dto';
export declare class ReadVisitHistoryOutput extends CoreOutput {
    today?: number;
    yesterday?: number;
    total?: number;
}
