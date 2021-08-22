import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchConfigModule } from '@config/elasticsearch/config.module';
import { ElasticsearchConfigService } from '@config/elasticsearch/config.service';
import { ElasticService } from './elastic.service';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ElasticsearchConfigModule],
      inject: [ElasticsearchConfigService],
      useFactory: (elasticsearchConfigService: ElasticsearchConfigService) => {
        const {
          node,
          username,
          password,
          maxRetries,
          requestTimeout,
          pingTimeout,
        } = elasticsearchConfigService;

        return {
          node,
          auth: {
            username,
            password,
          },
          maxRetries,
          requestTimeout,
          pingTimeout,
        };
      },
    }),
  ],
  providers: [ElasticService],
  exports: [ElasticService],
})
export class ElasticModule {}
