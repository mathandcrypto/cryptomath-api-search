import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { AppConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        APP_RABBITMQ_USER: Joi.string().required(),
        APP_RABBITMQ_PASSWORD: Joi.string().required(),
        APP_RABBITMQ_HOST: Joi.string().required(),
        APP_RABBITMQ_QUEUE_NAME: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
