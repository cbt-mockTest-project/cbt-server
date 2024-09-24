import { CoreOutput } from '../../common/dtos/output.dto';
import { ExamType } from './../entities/mock-exam-category.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class GetCategoryNamesAndSlugsInput {
  @Field(() => ExamType)
  examType: ExamType;
}

@ObjectType()
export class GetCategoryNamesAndSlugsOutput extends CoreOutput {
  @Field(() => [String], { nullable: true })
  names?: string[];
  @Field(() => [String], { nullable: true })
  urlSlugs?: string[];
}
