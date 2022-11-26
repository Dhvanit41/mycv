import { IsEmail, IsString } from 'class-validator';
export class createUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
