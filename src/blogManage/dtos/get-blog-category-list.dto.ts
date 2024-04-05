import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class GetBlogCategoryListInput {
  @Field(() => String)
  blogId: string;
}

@ObjectType()
export class GetBlogCategoryListOutput extends CoreOutput {
  @Field(() => [BlogCategory], { nullable: true, defaultValue: [] })
  categories?: BlogCategory[];
  @Field(() => Number, { nullable: true })
  postCnt?: number;
}

@ObjectType()
export class BlogCategory {
  @Field(() => Number)
  postCnt: number;

  @Field(() => String)
  categoryName: string;
}
