import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Feedback } from '../entities/feedback.entity';

@InputType()
export class CreateFeedbackInput extends PickType(Feedback, ['content']) {}

@ObjectType()
export class CreateFeedbackOutput extends CoreOutput {}
