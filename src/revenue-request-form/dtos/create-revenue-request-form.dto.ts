import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { RevenueRequestForm } from '../entites/revenue-request-form.entity';

@InputType()
export class CreateRevenueRequestFormInput {
  @Field(() => Number)
  categoryId: number;
}

@ObjectType()
export class CreateRevenueRequestFormOutput extends CoreOutput {
  @Field(() => RevenueRequestForm, { nullable: true })
  revenueRequestForm?: RevenueRequestForm;
}
