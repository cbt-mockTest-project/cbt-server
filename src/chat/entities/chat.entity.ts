import { IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Chat extends CoreEntity {
  @IsString()
  @Column()
  username: string;

  @IsString()
  @Column()
  message: string;

  @IsString()
  @Column()
  room: string;

  @IsString()
  @Column()
  clientId: string;
}
