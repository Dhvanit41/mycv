import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  Session,
} from '@nestjs/common';
import { createUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dtos/update-user.dto.';
import { AuthService } from './auth.service';
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authservice: AuthService,
  ) {}

  @Get('/whoami')
  whoAmI(@Session() session: any) {
    return this.usersService.findOne(session.userId);
  }

  @Post('/signup')
  async createUser(@Body() body: createUserDTO, @Session() session: any) {
    const user: any = await this.authservice.signUp(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signIn(@Body() body: createUserDTO, @Session() session: any) {
    const user: any = await this.authservice.signIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  async signout(@Body() body: createUserDTO, @Session() session: any) {
    session.userId = null;
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get('/:id')
  findAllUser(@Query('email') email: string) {
    this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, body: UpdateUserDTO) {
    return this.usersService.update(parseInt(id), body);
  }
}
