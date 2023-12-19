import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExam } from 'src/exam/entities/mock-exam.entity';

@InputType()
export class GetMyBookmarkedExamsInput {}

@ObjectType()
export class GetMyBookmarkedExamsOutput extends CoreOutput {
  @Field(() => [MockExam], { nullable: true })
  exams?: MockExam[];
}
