import { CoreOutput } from 'src/common/dtos/output.dto';
export declare class ExamTitleAndIdByQuestionComment {
    id: number;
    title: string;
}
export declare class ReadExamTitleAndIdByQuestionCommentOutput extends CoreOutput {
    examTitleAndId?: ExamTitleAndIdByQuestionComment[];
}
