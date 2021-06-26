import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchConfigModule } from '@config/elasticsearch/config.module';
import { ElasticsearchConfigService } from '@config/elasticsearch/config.service';
import { SearchService } from './search.service';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ElasticsearchConfigModule],
      inject: [ElasticsearchConfigService],
      useFactory: (elasticsearchConfigService: ElasticsearchConfigService) => {
        const {
          node,
          authUsername,
          authPassword,
          maxRetries,
          requestTimeout,
          pingTimeout,
        } = elasticsearchConfigService;

        return {
          node,
          auth: {
            username: authUsername,
            password: authPassword,
          },
          maxRetries,
          requestTimeout,
          pingTimeout,
        };
      },
    }),
    ElasticsearchConfigModule,
  ],
  providers: [ElasticsearchConfigService, SearchService],
})
export class SearchModule {}
