import { CoreOutput } from './../../common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class NaverBlogViewMacroInput {
  @Field(() => String, { nullable: true })
  blogUrl?: string;
}

@ObjectType()
export class NaverBlogViewMacroOutput extends CoreOutput {}
