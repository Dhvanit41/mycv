import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { UpdateTicketDto } from './dtos/update-ticket.dto';
import { TicketService } from './ticket.service';
import { CommonQuery } from './dtos/commonQuery.dto';

@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Post('/create-ticket')
  async createTicket(@Body() body: CreateTicketDto) {
    const ticket = await this.ticketService.create(body);
    return ticket;
  }

  @Patch('/:id')
  async updateTicket(@Param('id') id: string, @Body() body: UpdateTicketDto) {
    const ticket = await this.ticketService.findOne(parseInt(id));
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return this.ticketService.update(parseInt(id), body);
  }

  @Get('/:id')
  async findTicket(@Param('id') id: string) {
    const ticket = await this.ticketService.findOne(parseInt(id));
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return ticket;
  }

  @Get()
  findAllTicket(@Query() getTicketInput: CommonQuery) {
    return this.ticketService.find(getTicketInput);
  }
}
