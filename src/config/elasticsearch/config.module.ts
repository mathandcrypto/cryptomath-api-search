import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { ElasticsearchConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        ELASTICSEARCH_NODE: Joi.string().required(),
        ELASTICSEARCH_AUTH_USERNAME: Joi.string().required(),
        ELASTICSEARCH_AUTH_PASSWORD: Joi.string().required(),
        ELASTICSEARCH_MAX_RETRIES: Joi.number().default(3),
        ELASTICSEARCH_REQUEST_TIMEOUT: Joi.number().default(10000),
        ELASTICSEARCH_PING_TIMEOUT: Joi.number().default(3000),
      }),
    }),
  ],
  providers: [ConfigService, ElasticsearchConfigService],
  exports: [ConfigService, ElasticsearchConfigService],
})
export class ElasticsearchConfigModule {}
