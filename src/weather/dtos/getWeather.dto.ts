import { InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class GetWeatherInput {
  @IsString()
  keyword: string;
}

@ObjectType()
export class GetWeatherOutput extends CoreOutput {}
