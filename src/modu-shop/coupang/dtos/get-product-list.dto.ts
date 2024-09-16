import { Product } from 'aws-sdk/clients/ssm';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetProductListInput {
  @IsString()
  @IsNotEmpty()
  keyword: string;

  @IsNumber()
  @IsOptional()
  limit: number;
}

export class GetProductListOutput {
  ok: boolean;
  error?: string;
  products?: Product[];
}
