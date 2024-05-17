import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CategoryPointHistory } from 'src/point/entities/category-point-history.entity';

@InputType()
export class GetCategoryPointHistoriesInput {
  @Field(() => Number)
  categoryId: number;
}

@ObjectType()
export class GetCategoryPointHistoriesOutput extends CoreOutput {
  @Field(() => [CategoryPointHistory], { nullable: true, defaultValue: [] })
  categoryPointHistories?: CategoryPointHistory[];
}
