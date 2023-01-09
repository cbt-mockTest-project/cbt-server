import { CoreOutput } from './../../common/dtos/output.dto';
export declare class UpdateApprovedStateOfMockExamQuestionInput {
    questionId: number;
}
export declare class UpdateApprovedStateOfMockExamQuestionOutput extends CoreOutput {
    currentApprovedState?: boolean;
    questionId?: number;
}
