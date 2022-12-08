import { IsString, IsNumber, Min, Max, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

import TicketStates from '../enums/TicketStates.enum';

export class CreateTicketDto {
  @IsString()
  @IsEnum(TicketStates)
  state: string;

  @IsString()
  description: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  storyPoints: number;
}
