import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto, UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get('/list')
  getList(@Query() query: QueryUserDto) {
    console.log(query);
    return this.usersService.getList(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user) {
    return this.usersService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Body() updateUserDto: UpdateUserDto, @User() user) {
    return this.usersService.update(updateUserDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete an user')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
