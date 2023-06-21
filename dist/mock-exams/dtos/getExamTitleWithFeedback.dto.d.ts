import { CoreOutput } from 'src/common/dtos/output.dto';
export declare class GetExamTitleWithFeedbackTitle {
    id: number;
    title: string;
}
export declare class GetExamTitleWithFeedbackOutput extends CoreOutput {
    titles?: GetExamTitleWithFeedbackTitle[];
}
