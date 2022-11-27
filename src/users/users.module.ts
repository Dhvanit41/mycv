import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './dtos/user.entity';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  //create user reposoitory
  providers: [UsersService, AuthService],
  controllers: [UsersController],
})
export class UsersModule {}
