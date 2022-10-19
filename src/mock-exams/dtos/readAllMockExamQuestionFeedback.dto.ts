import { CoreOutput } from './../../common/dtos/output.dto';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReadAllMockExamQuestionFeedbackOutput extends CoreOutput {}
