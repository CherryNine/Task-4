import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(1)
  password: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;
}
