import { CoreOutput } from './../../common/dtos/output.dto';
import { MockExam } from './../entities/mock-exam.entity';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class DeleteMockExamInput extends PickType(MockExam, ['id']) {}

@ObjectType()
export class DeleteMockExamOutput extends CoreOutput {}
