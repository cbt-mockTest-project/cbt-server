import { MockExam } from './../entities/mock-exam.entity';
import { CoreOutput } from './../../common/dtos/output.dto';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class CreateMockExamInput extends PickType(MockExam, ['title']) {
  @Field(() => String)
  categoryName: string;
}

@ObjectType()
export class CreateMockExamOutput extends CoreOutput {
  @Field(() => MockExam, { nullable: true })
  mockExam?: MockExam;
}
