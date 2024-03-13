import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Quiz } from '../entities/quiz.entity';

@InputType()
export class GetQuizsInput {
  @Field(() => String)
  date: string;

  @Field(() => Number)
  categoryId: number;
}

@ObjectType()
export class GetQuizsOutput extends CoreOutput {
  @Field(() => [Quiz], { nullable: true, defaultValue: [] })
  quizs?: Quiz[];
}
