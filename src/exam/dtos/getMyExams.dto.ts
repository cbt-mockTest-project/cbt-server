import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExam } from '../entities/mock-exam.entity';

@InputType()
export class GetMyExamsInput {
  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isBookmarked?: boolean;
}

@ObjectType()
export class GetMyExamsOutput extends CoreOutput {
  @Field(() => [MockExam], { nullable: true })
  exams?: MockExam[];
}
