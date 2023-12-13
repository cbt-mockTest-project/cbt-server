import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { MockExamCategory } from '../entities/mock-exam-category.entity';

@InputType()
export class EditMockExamCategoryInput extends PickType(MockExamCategory, [
  'id',
  'name',
]) {
  @Field(() => Boolean, { nullable: true })
  isPublic?: boolean;
  @Field(() => String, { nullable: true })
  description?: string;
}

@ObjectType()
export class EditMockExamCategoryOutput extends CoreOutput {}
