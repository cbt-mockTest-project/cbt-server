import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@InputType('SecederInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Seceders extends CoreEntity {
  @Field((type) => String)
  @Column()
  email: string;
}
