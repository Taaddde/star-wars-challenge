import { DynamicModule, Module } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { AuthenticateOption } from './authenticate.options';

@Module({})
export class AuthenticateModule {
  static forRoot(options: AuthenticateOption): DynamicModule {
    return {
      module: AuthenticateModule,
      providers: [
        {
          provide: AuthenticateOption,
          useValue: new AuthenticateOption(options),
        },
        AuthenticateService,
      ],
      exports: [AuthenticateService],
    };
  }
}
