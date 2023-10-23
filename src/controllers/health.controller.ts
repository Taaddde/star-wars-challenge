import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  constructor() {}

  @Get()
  healthCheck(): string {
    return 'Health Check OK';
  }
}
