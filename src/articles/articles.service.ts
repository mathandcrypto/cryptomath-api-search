import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ElasticService } from '@providers/elastic/elastic.service';
import { ArticlesConfigService } from '@config/articles/config.service';

@Injectable()
export class ArticlesService implements OnModuleInit {
  private readonly logger = new Logger(ArticlesService.name);

  constructor(
    private readonly elasticService: ElasticService,
    private readonly articlesConfigService: ArticlesConfigService,
  ) {}

  async insertDocument(
    title: string,
    abstract: string,
    fullText: string,
    userId: number,
    hubs: number[],
    tags: number[],
    createdAt: Date,
  ): Promise<[boolean, string]> {
    const [isDocumentIndexed, indexedDocument] =
      await this.elasticService.indexDocument(
        this.articlesConfigService.articlesElasticsearchIndex,
        {
          title,
          abstract,
          fullText,
          user_id: userId,
          hubs,
          tags,
          comments_count: 0,
          rating: 0,
          created_at: createdAt,
        },
      );

    if (!isDocumentIndexed) {
      return [false, ''];
    }

    const { result: createArticleDocumentResult, _id: articleDocumentId } =
      indexedDocument;

    if (createArticleDocumentResult !== 'created') {
      return [false, ''];
    }

    return [true, articleDocumentId];
  }

  async setupIndex() {
    const { articlesElasticsearchIndex } = this.articlesConfigService;

    const [isIndexCreated, createdIndexResponse] =
      await this.elasticService.createIndex<Record<string, any>>(
        articlesElasticsearchIndex,
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
                  min_gram: 2,
                  max_gram: 10,
                  token_chars: ['letter', 'digit', 'whitespace'],
                },
              },
            },
          },
          mappings: {
            properties: {
              article_id: {
                type: 'keyword',
              },
              title: {
                type: 'text',
                analyzer: 'autocomplete',
                search_analyzer: 'autocomplete_search',
              },
              abstract: {
                type: 'text',
                analyzer: 'autocomplete',
                search_analyzer: 'autocomplete_search',
              },
              full_text: {
                type: 'text',
                analyzer: 'autocomplete',
                search_analyzer: 'autocomplete_search',
              },
              user_id: {
                type: 'keyword',
              },
              hubs: {
                type: 'keyword',
              },
              tags: {
                type: 'keyword',
              },
              comments_count: {
                type: 'integer',
              },
              rating: {
                type: 'integer',
              },
              created_at: {
                type: 'date',
              },
            },
          },
        },
      );

    if (isIndexCreated && createdIndexResponse.acknowledged) {
      this.logger.log(`Created new index: ${articlesElasticsearchIndex}`);
    }
  }

  async onModuleInit() {
    await this.setupIndex();
  }
}
