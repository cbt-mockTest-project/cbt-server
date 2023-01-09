import { CoreOutput } from './../../common/dtos/output.dto';
export declare class TitleAndId {
    id?: number;
    title?: string;
}
export declare class FindMyExamHistoryInput {
    categoryIds: number[];
}
export declare class FindMyExamHistoryOutput extends CoreOutput {
    titleAndId?: TitleAndId[];
}
