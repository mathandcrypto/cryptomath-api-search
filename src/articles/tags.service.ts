import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ElasticService } from '@providers/elastic/elastic.service';
import { ArticlesConfigService } from '@config/articles/config.service';

@Injectable()
export class TagsService implements OnModuleInit {
  private readonly logger = new Logger(TagsService.name);

  constructor(
    private readonly elasticService: ElasticService,
    private readonly articlesConfigService: ArticlesConfigService,
  ) {}

  async setupIndex() {
    const { tagsElasticsearchIndex } = this.articlesConfigService;

    const [isIndexCreated, createdIndexResponse] =
      await this.elasticService.createIndex<Record<string, any>>(
        tagsElasticsearchIndex,
        {
          settings: {
            analysis: {
              analyzer: {
                autocomplete: {
                  tokenizer: 'autocomplete',
                  filter: ['lowercase'],
                },
                autocomplete_search: {
                  tokenizer: 'lowercase',
                },
              },
              tokenizer: {
                autocomplete: {
                  type: 'edge_ngram',
                  min_gram: 3,
                  max_gram: 10,
                  token_chars: ['letter', 'digit', 'whitespace'],
                },
              },
            },
          },
          mappings: {
            properties: {
              tag_id: {
                type: 'keyword',
              },
              name: {
                type: 'text',
                analyzer: 'autocomplete',
                search_analyzer: 'autocomplete_search',
              },
              description: {
                type: 'text',
                analyzer: 'autocomplete',
                search_analyzer: 'autocomplete_search',
              },
              hub_id: {
                type: 'keyword',
              },
              articles_count: {
                type: 'integer',
              },
            },
          },
        },
      );

    if (isIndexCreated && createdIndexResponse.acknowledged) {
      this.logger.log(`Created new index: ${tagsElasticsearchIndex}`);
    }
  }

  async onModuleInit() {
    await this.setupIndex();
  }
}
