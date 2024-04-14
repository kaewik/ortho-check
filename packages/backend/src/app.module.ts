import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { setupOrthographyChecker } from 'orthography-lib';
import { CheckController } from './check.controller';
import { CheckService } from './check.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validationSchema: Joi.object({
        AI_API_KEY: Joi.string().required(),
        AI_MODEL: Joi.string().default('gpt-3.5-turbo'),
      }),
    }),
  ],
  controllers: [CheckController],
  providers: [
    CheckService,
    {
      provide: 'OrthographyChecker',
      useFactory: (configService: ConfigService) =>
        setupOrthographyChecker({
          apiKey: configService.get('AI_API_KEY')!,
          modelConfig: {
            model: configService.get('AI_MODEL')!,
            temperature: 0.0,
          },
        }),
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
