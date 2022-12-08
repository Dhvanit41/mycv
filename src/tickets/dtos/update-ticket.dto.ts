import { IsString, IsEnum } from 'class-validator';

import TicketStates from '../enums/TicketStates.enum';

export class UpdateTicketDto {
  @IsString()
  @IsEnum(TicketStates)
  state: string;
}
