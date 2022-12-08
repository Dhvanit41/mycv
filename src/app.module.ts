import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicktetModule } from './tickets/ticket.module';
import { Ticket } from './tickets/ticket.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Ticket],
      synchronize: true,
    }),
    TicktetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
