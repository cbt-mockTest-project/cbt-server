import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EditAdBlockInput {
  @Field(() => Number)
  id: number;
}
