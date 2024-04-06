import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@ObjectType()
export class BlogVisitor {
  @Field(() => String)
  date: string;
  @Field(() => String)
  visitor: string;
}

@ObjectType()
export class BlogInfo {
  @Field(() => String)
  influencerUrl: string;

  @Field(() => [BlogVisitor], { nullable: true, defaultValue: [] })
  blogVisitor?: BlogVisitor[];
}

@InputType()
export class GetBlogInfoInput {
  @Field(() => String)
  blogId: string;
}

@ObjectType()
export class GetBlogInfoOutput extends CoreOutput {
  @Field(() => BlogInfo, { nullable: true })
  blogInfo?: BlogInfo;
}
