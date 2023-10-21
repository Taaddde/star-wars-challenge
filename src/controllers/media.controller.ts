import { Controller, Get, UseGuards, Version } from '@nestjs/common';
import { AppService } from '../app.service';
import { AdminMiddleware } from 'src/middlewares/admin-validate.middleware';

@Controller('media')
export class MediaController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Version('1')
  getHello(): string {
    return this.appService.getHello();
  }
}
