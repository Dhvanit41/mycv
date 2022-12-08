import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { CommonQuery } from './dtos/commonQuery.dto';

@Injectable()
export class TicketService {
  constructor(@InjectRepository(Ticket) private repo: Repository<Ticket>) {}

  create(body: CreateTicketDto) {
    const ticket = this.repo.create(body);
    return this.repo.save(ticket);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne(id);
  }

  async find(params: CommonQuery) {
    const {
      page = 1,
      limit = 10,
      state,
      startDate,
      endDate,
      storyPoints,
      isGreater,
    } = params;
    const query = this.repo.createQueryBuilder().select('*').where({});

    // adds filter step by step
    if (state) {
      query.andWhere('state = :state', {
        state,
      });
    }

    if (startDate) {
      query.andWhere('created_at >= :startDate', {
        startDate,
      });
    }

    if (endDate) {
      query.andWhere('created_at <= :endDate', {
        endDate,
      });
    }

    if (storyPoints) {
      if (isGreater) {
        query.andWhere('storyPoints > :storyPoints', {
          storyPoints,
        });
      } else {
        query.andWhere('storyPoints < :storyPoints', {
          storyPoints,
        });
      }
    }

    query.skip(page * limit - limit);
    query.limit(limit);

    const results = await query.getRawMany();
    const total = await query.getCount();

    return {
      data: results,
      pagination: {
        total,
        count: results.length,
        limit,
        pages: Math.ceil(results.length / limit),
      },
    };
  }

  async update(id: number, attrs: Partial<Ticket>) {
    const ticket = await this.findOne(id);
    Object.assign(ticket, attrs);
    return this.repo.save(ticket);
  }
}
