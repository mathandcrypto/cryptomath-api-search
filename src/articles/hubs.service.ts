import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ElasticService } from '@providers/elastic/elastic.service';
import { ArticlesConfigService } from '@config/articles/config.service';
import {
  HubsFilters as HubsFiltersProto,
  HubsSorts as HubsSortsProto,
} from '@cryptomath/cryptomath-api-proto/types/search';
import { HubsSorts } from './interface/hubs/sorts.interface';
import { HubsFilters } from './interface/hubs/filters.interface';
import { HubSource } from './interface/hubs/source.interface';
import { SearchBaseRequestBody } from '@common/interfaces/elastic/search/base-request-body.interface';
import { ParentRelation } from '@common/interfaces/elastic/index/parent-relation.interface';
import { UpdateDocumentRequestBody } from '@common/interfaces/elastic/document/update-request-body.interface';
import { SearchHit } from '@elastic/elasticsearch/api/types';
import { getSortOrder } from '@common/helpers/sorts';
import { getRangeQueryObject } from '@common/helpers/filters';
import { prepareSearchRequestBody } from '@common/helpers/elastic';

@Injectable()
export class HubsService implements OnModuleInit {
  private readonly logger = new Logger(HubsService.name);

  constructor(
    private readonly elasticService: ElasticService,
    private readonly articlesConfigService: ArticlesConfigService,
  ) {}

  protected getFilterObject(filters: HubsFiltersProto): HubsFilters {
    const filterObject = {} as HubsFilters;

    if (filters.articles) {
      const {
        equals: articlesEqual,
        min: articlesMin,
        max: articlesMax,
      } = filters.articles;

      filterObject.articles_count = getRangeQueryObject(
        articlesEqual,
        articlesMin,
        articlesMax,
      );
    }

    if (filters.tags) {
      const { equals: tagsEqual, min: tagsMin, max: tagsMax } = filters.tags;

      filterObject.tags_count = getRangeQueryObject(
        tagsEqual,
        tagsMin,
        tagsMax,
      );
    }

    return filterObject;
  }

  protected getSortObject(sorts: HubsSortsProto): HubsSorts {
    const sortObject = {} as HubsSorts;

    if (sorts.name) {
      const { direction: nameDirection } = sorts.name;

      sortObject.name = getSortOrder(nameDirection);
    }

    if (sorts.articles) {
      const { direction: articlesDirection } = sorts.articles;

      sortObject.articles_count = getSortOrder(articlesDirection);
    }

    if (sorts.tags) {
      const { direction: tagsDirection } = sorts.tags;

      sortObject.tags_count = getSortOrder(tagsDirection);
    }

    return sortObject;
  }

  async search(
    query: string,
    filters: HubsFiltersProto,
    sorts: HubsSortsProto,
    offset: number,
    limit: number,
  ): Promise<[boolean, number, number, number, Array<SearchHit<HubSource>>]> {
    const sortObject = this.getSortObject(sorts);
    const filterObject = this.getFilterObject(filters);
    const size = Math.min(
      limit,
      this.articlesConfigService.hubsSearchResultsMaxLimit,
    );
    const searchRequest = prepareSearchRequestBody<HubsFilters, HubsSorts>(
      query,
      ['name', 'description'],
      filterObject,
      sortObject,
      offset,
      size,
      'hub',
    );

    const [isDocumentsFound, totalDocuments, searchResponse] =
      await this.elasticService.search<SearchBaseRequestBody, HubSource>(
        this.articlesConfigService.hubsElasticsearchIndex,
        searchRequest,
      );

    if (!isDocumentsFound) {
      return [false, 0, 0, 0, []];
    }

    const { hits, took } = searchResponse;
    const { hits: hubsDocuments } = hits;

    return [true, took, size, totalDocuments, hubsDocuments];
  }

  async insertDocument(
    id: number,
    name: string,
    description: string,
  ): Promise<[boolean, string]> {
    const [isDocumentIndexed, indexedDocument] =
      await this.elasticService.indexDocument<HubSource & ParentRelation>(
        this.articlesConfigService.hubsElasticsearchIndex,
        {
          hub_id: id,
          name,
          description,
          articles_count: 0,
          tags_count: 0,
          relation_type: {
            name: 'hub',
          },
        },
      );

    if (!isDocumentIndexed) {
      return [false, ''];
    }

    const { result: createHubDocumentResult, _id: hubDocumentId } =
      indexedDocument;

    if (createHubDocumentResult === 'created') {
      return [true, hubDocumentId];
    }

    return [false, ''];
  }

  async updateDocument(
    documentId: string,
    updateData: Partial<HubSource>,
  ): Promise<[boolean, number]> {
    const updateRequestBody = {
      doc: updateData,
    };
    const [isDocumentUpdated, updateResult] =
      await this.elasticService.updateDocument<
        UpdateDocumentRequestBody<Partial<HubSource>>
      >(
        this.articlesConfigService.hubsElasticsearchIndex,
        documentId,
        updateRequestBody,
      );

    if (!isDocumentUpdated) {
      return [false, 0];
    }

    const { result: updateHubDocumentResult, _version: hubDocumentVersion } =
      updateResult;

    if (updateHubDocumentResult === 'updated') {
      return [true, hubDocumentVersion];
    }

    return [false, 0];
  }

  async setupIndex() {
    const { hubsElasticsearchIndex } = this.articlesConfigService;

    const [isIndexCreated, createdIndexResponse] =
      await this.elasticService.createIndex<Record<string, any>>(
        hubsElasticsearchIndex,
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
              hub_id: {
                type: 'keyword',
              },
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
              articles_count: {
                type: 'integer',
              },
              tags_count: {
                type: 'integer',
              },
              relation_type: {
                type: 'join',
                relations: {
                  hub: 'tag',
                },
              },
            },
          },
        },
      );

    if (isIndexCreated && createdIndexResponse.acknowledged) {
      this.logger.log(`Created new index: ${hubsElasticsearchIndex}`);
    }
  }

  async onModuleInit() {
    await this.setupIndex();
  }
}
