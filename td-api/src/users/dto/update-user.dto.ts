import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional } from 'class-validator';
export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class QueryUserDto {
  @IsOptional()
  name: string;
  @IsOptional()
  email: string;
  @IsOptional()
  username: string;
  @IsOptional()
  role: string;
  @IsOptional()
  page: number;
  @IsOptional()
  limit: number;
}