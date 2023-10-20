import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller('user')
export class MediaController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Version('1')
  getHello(): string {
    return this.appService.getHello();
  }
}
