import { Body, Controller, Get, Post, UseInterceptors, Version } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/user.dto';
import { UserService } from '@app/db-mongoose/user/user.service';
import { ValidationInterceptor } from 'src/interceptors/class-validator.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Version(['1'])
  @UseInterceptors(ValidationInterceptor)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
