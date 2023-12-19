import { ExamStatus } from 'src/enums/enum';
import { CoreOutput } from '../../common/dtos/output.dto';
import { MockExam } from '../entities/mock-exam.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class EditMockExamInput extends PickType(MockExam, ['id']) {
  @Field(() => ExamStatus, { nullable: true })
  status?: ExamStatus;
  @Field(() => String, { nullable: true })
  title?: string;
}

@ObjectType()
export class EditMockExamOutput extends CoreOutput {}
