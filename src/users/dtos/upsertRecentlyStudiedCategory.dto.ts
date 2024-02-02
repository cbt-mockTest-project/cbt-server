import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class UpsertRecentlyStudiedCategoryInput {
  @Field(() => Number)
  categoryId: number;
}

@ObjectType()
export class UpsertRecentlyStudiedCategoryOutput extends CoreOutput {}
