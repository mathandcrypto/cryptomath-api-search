import { Injectable, OnModuleInit } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService implements OnModuleInit {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async onModuleInit() {
    const checkIndex = await this.elasticsearchService.indices.exists({
      index: 'articles',
    });

    if (checkIndex.body) {
      await this.elasticsearchService.indices.create({
        index: 'articles',
        body: {
          mappings: {
            properties: {
              title: {
                type: 'text',
              },
            },
          },
        },
      });
    }
  }
}
