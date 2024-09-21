import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class CoupangSearchLog extends CoreEntity {
  @Column()
  keyword: string;

  @Column({
    default: 1,
  })
  count: number;
}
