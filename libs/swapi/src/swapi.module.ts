import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module } from '@nestjs/common';
import { SwapiService } from './swapi.service';
import { SwapiOption } from './swapi.options';

@Module({
  imports: [HttpModule],
})
export class SwapiModule {
  static forRoot(options: SwapiOption): DynamicModule {
    return {
      module: SwapiModule,
      providers: [
        {
          provide: SwapiOption,
          useValue: new SwapiOption(options),
        },
        SwapiService,
      ],
      exports: [SwapiService],
    };
  }
}
