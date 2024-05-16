import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { RevenueRequestForm } from '../entites/revenue-request-form.entity';

@InputType()
export class GetRevenueRequestFormsInput {}

@ObjectType()
export class GetRevenueRequestFormsOutput extends CoreOutput {
  @Field(() => [RevenueRequestForm], { nullable: true })
  revenueRequestForms?: RevenueRequestForm[];
}
