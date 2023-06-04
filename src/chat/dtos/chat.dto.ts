import { IsString } from 'class-validator';

export class HandleRoomJoinPayload {
  @IsString()
  room: string;
}

export class HandleRoomLeavePayload {
  @IsString()
  room: string;
}

export class HandleMessagePayload {
  @IsString()
  room: string;

  @IsString()
  message: string;
}
