import { IsOptional, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()
export class ChatbotKey {
  @IsString()
  @Column({ unique: true, primary: true })
  key: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true, default: null })
  startDate?: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true, default: null })
  endDate?: string;
}
