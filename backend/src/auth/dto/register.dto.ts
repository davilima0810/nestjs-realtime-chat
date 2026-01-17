import { IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @MinLength(6)
  password: string;
}
