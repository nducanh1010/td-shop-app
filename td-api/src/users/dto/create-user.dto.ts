import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'First name không để trống',
  })
  name: string;
  @IsNotEmpty({
    message: 'Email không được để trống',
  })
  email: string;
  @IsNotEmpty({
    message: 'Username không để trống',
  })
  username: string;
  @IsNotEmpty({
    message: 'Password không để trống',
  })
  password: string;
  @IsOptional()
  refreshToken: string;
}
