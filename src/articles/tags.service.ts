import { Injectable } from '@nestjs/common';
import { ElasticService } from '@providers/elastic/elastic.service';
import { ArticlesConfigService } from '@config/articles/config.service';
import {
  TagsFilters as TagsFiltersProto,
  TagsSorts as TagsSortsProto,
} from '@cryptomath/cryptomath-api-proto/types/search';
import { TagSource } from './interface/tags/source.interface';
import { ChildRelation } from '@common/interfaces/elastic/index/child-relation.interface';
import { TagsFilters } from './interface/tags/filters.interface';
import { TagsSorts } from './interface/tags/sorts.interface';
import { HubsPackageService } from '@providers/grpc/articles/hubs-package.service';
import {
  QueryDslParentIdQuery,
  SearchHit,
} from '@elastic/elasticsearch/api/types';
import { SearchBaseRequestBody } from '@common/interfaces/elastic/search/base-request-body.interface';
import { getRangeQueryObject } from '@common/helpers/filters';
import { getSortOrder } from '@common/helpers/sorts';
import { prepareSearchRequestBody } from '@common/helpers/elastic';

@Injectable()
export class TagsService {
  constructor(
    private readonly elasticService: ElasticService,
    private readonly articlesConfigService: ArticlesConfigService,
    private readonly hubsPackageService: HubsPackageService,
  ) {}

  protected getFilterObject(filters: TagsFiltersProto): TagsFilters {
    const filterObject = {} as TagsFilters;

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

    return filterObject;
  }

  protected getSortObject(sorts: TagsSortsProto): TagsSorts {
    const sortObject = {} as TagsSorts;

    if (sorts.name) {
      const { direction: nameDirection } = sorts.name;

      sortObject.name = getSortOrder(nameDirection);
    }

    if (sorts.articles) {
      const { direction: articlesDirection } = sorts.articles;

      sortObject.articles_count = getSortOrder(articlesDirection);
    }

    return sortObject;
  }

  async getParentId(hubId: number): Promise<[boolean, QueryDslParentIdQuery]> {
    const [findSearchIdStatus, findSearchIdResponse] =
      await this.hubsPackageService.findHubSearchId(hubId);

    if (!findSearchIdStatus) {
      return [false, null];
    }

    const { isHubIndexed, documentId } = findSearchIdResponse;

    if (!isHubIndexed) {
      return [false, null];
    }

    return [true, { id: documentId, type: 'tag' }];
  }

  async search(
    query: string,
    filters: TagsFiltersProto,
    sorts: TagsSortsProto,
    offset: number,
    limit: number,
  ): Promise<[boolean, number, number, number, Array<SearchHit<TagSource>>]> {
    const sortObject = this.getSortObject(sorts);
    const filterObject = this.getFilterObject(filters);
    const size = Math.min(
      limit,
      this.articlesConfigService.tagsSearchResultsMaxLimit,
    );
    let parentId: QueryDslParentIdQuery;

    if (filters.hub) {
      const hubId = filters.hub.id;
      const [isParentIdFound, parentIdValue] = await this.getParentId(hubId);

      if (isParentIdFound) {
        parentId = parentIdValue;
      }
    }

    const searchRequest = prepareSearchRequestBody<TagsFilters, TagsSorts>(
      query,
      ['name', 'description'],
      filterObject,
      sortObject,
      offset,
      size,
      'tag',
      parentId,
    );

    const [isDocumentsFound, totalDocuments, searchResponse] =
      await this.elasticService.search<SearchBaseRequestBody, TagSource>(
        this.articlesConfigService.hubsElasticsearchIndex,
        searchRequest,
      );

    if (!isDocumentsFound) {
      return [false, 0, 0, 0, []];
    }

    const { hits, took } = searchResponse;
    const { hits: tagsDocuments } = hits;

    return [true, took, size, totalDocuments, tagsDocuments];
  }

  async insertDocument(
    id: number,
    hubId: number,
    hubDocumentId: string,
    name: string,
    description: string,
  ): Promise<[boolean, string]> {
    const [isDocumentIndexed, indexedDocument] =
      await this.elasticService.indexDocument<TagSource & ChildRelation>(
        this.articlesConfigService.hubsElasticsearchIndex,
        {
          tag_id: id,
          hub_id: hubId,
          name,
          description,
          articles_count: 0,
          relation_type: {
            name: 'tag',
            parent: hubDocumentId,
          },
        },
        {
          routing: hubDocumentId,
        },
      );

    if (!isDocumentIndexed) {
      return [false, ''];
    }

    const { result: createTsgDocumentResult, _id: tagDocumentId } =
      indexedDocument;

    if (createTsgDocumentResult === 'created') {
      return [true, tagDocumentId];
    }

    return [false, ''];
  }
}
