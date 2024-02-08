import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class UpdateRecentlyStudiedCategoryInput {
  @Field(() => String)
  categoryName: string;
}

@ObjectType()
export class UpdateRecentlyStudiedCategoryOutput extends CoreOutput {}
