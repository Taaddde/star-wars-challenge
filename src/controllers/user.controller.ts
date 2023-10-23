import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Query,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import {
  CreateUserDto,
  LoginResponseDto,
  LoginUserDto,
  UserGenericResponseDto,
  UserListDto,
  UserResponseDto,
} from '../dtos/user.dto';
import { UserService } from '@app/db-mongoose/user/user.service';
import { ValidationInterceptor } from '../interceptors/class-validator.interceptor';
import { AuthenticateService } from '@app/authenticate';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authenticateService: AuthenticateService,
  ) {}

  @Post()
  @Version(['1'])
  @HttpCode(201)
  @UseInterceptors(ValidationInterceptor)
  createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserGenericResponseDto> {
    return this.userService.create(createUserDto);
  }

  @Post('/login')
  @Version(['1'])
  @HttpCode(200)
  @UseInterceptors(ValidationInterceptor)
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
    const user = await this.userService.findOneByUsername(
      loginUserDto.username,
    );
    const token = await this.authenticateService.authenticate(
      user,
      loginUserDto.username,
      loginUserDto.password,
    );
    return new LoginResponseDto(user, token);
  }

  @Get()
  @Version(['1'])
  @HttpCode(200)
  async getUserList(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<UserListDto> {
    return await this.userService.findAll({ page, limit });
  }

  @Get(':id')
  @HttpCode(200)
  async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new UserResponseDto(user);
  }
}
