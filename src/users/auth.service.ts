import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(email: string, password: string) {
    /// see email is in usse
    const users = await this.userService.find(email);
    if (users.length) {
      return new BadRequestException('Email is in use');
    }

    const slat = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, slat, 32)) as Buffer;

    const result = slat + '.' + hash.toString('hex');
    const user = await this.userService.create(email, result);
    return user;
  }

  async signIn(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash != hash.toString('hex')) {
      return new BadRequestException('bad passowrd');
    }

    return user;
  }
}
