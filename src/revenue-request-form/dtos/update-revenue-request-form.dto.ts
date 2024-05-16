import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { RevenueRequestForm } from '../entites/revenue-request-form.entity';

@InputType()
export class UpdateRevenueRequestFormInput extends PickType(
  RevenueRequestForm,
  ['id', 'status', 'reason'],
) {}

@ObjectType()
export class UpdateRevenueRequestFormOutput extends CoreOutput {}
