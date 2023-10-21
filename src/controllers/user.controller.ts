import { Body, Controller, Get, NotFoundException, Param, Post, UseInterceptors, Version } from '@nestjs/common';
import { CreateUserDto, LoginResponseDto, LoginUserDto, UserResponseDto } from 'src/dtos/user.dto';
import { UserService } from '@app/db-mongoose/user/user.service';
import { ValidationInterceptor } from 'src/interceptors/class-validator.interceptor';
import { AuthenticateService } from '@app/authenticate';
import { User } from '@app/db-mongoose/user/user.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService, 
    private readonly authenticateService: AuthenticateService
  ) {}

  @Post()
  @Version(['1'])
  @UseInterceptors(ValidationInterceptor)
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Post('/login')
  @Version(['1'])
  @UseInterceptors(ValidationInterceptor)
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
    const user = await this.userService.findOneByUsername(loginUserDto.username);
    const token = await this.authenticateService.authenticate(user, loginUserDto.username, loginUserDto.password);
    return new LoginResponseDto(user, token);
  }

  @Get()
  @Version(['1'])
  async getUserList(): Promise<UserResponseDto[]> {
    const users = await this.userService.findAll();
    return users.map((user) => new UserResponseDto(user));
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new UserResponseDto(user);
  }
}
