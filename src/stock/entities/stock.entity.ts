import { InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@InputType('StockInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Stock extends CoreEntity {
  @Column()
  name: string;

  @Column()
  code: string;
}
