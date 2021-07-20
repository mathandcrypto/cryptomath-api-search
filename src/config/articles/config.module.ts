import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { ArticlesConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        ARTICLES_ELASTICSEARCH_INDEX: Joi.string().required(),
        HUBS_ELASTICSEARCH_INDEX: Joi.string().required(),
        TAGS_ELASTICSEARCH_INDEX: Joi.string().required(),
        ARTICLES_SEARCH_RESULTS_MAX_LIMIT: Joi.number().min(10).max(50),
        HUBS_SEARCH_RESULTS_MAX_LIMIT: Joi.number().min(10).max(50),
        TAGS_SEARCH_RESULTS_MAX_LIMIT: Joi.number().min(10).max(50),
      }),
    }),
  ],
  providers: [ConfigService, ArticlesConfigService],
  exports: [ArticlesConfigService],
})
export class ArticlesConfigModule {}
