import { CoreOutput } from '../../common/dtos/output.dto';
import { MockExam } from '../entities/mock-exam.entity';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class EditMockExamInput extends PickType(MockExam, ['id', 'title']) {}

@ObjectType()
export class EditMockExamOutput extends CoreOutput {}
