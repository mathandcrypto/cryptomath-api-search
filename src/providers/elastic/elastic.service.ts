import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { RequestParams } from '@elastic/elasticsearch';
import { ResponseError } from '@elastic/elasticsearch/lib/errors';
import { CreateIndexResponse } from './interface/create-index-response.interface';
import { IndexDocumentResponse } from './interface/index-document-response.interface';
import {
  SearchRequest,
  SearchResponse,
} from '@elastic/elasticsearch/api/types';

@Injectable()
export class ElasticService {
  private readonly logger = new Logger(ElasticService.name);

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async createIndex<T = any>(
    indexName: string,
    indexBody: T,
  ): Promise<[boolean, CreateIndexResponse]> {
    try {
      const request: RequestParams.IndicesCreate<T> = {
        index: indexName,
        body: indexBody,
      };

      const response =
        await this.elasticsearchService.indices.create<CreateIndexResponse>(
          request,
        );

      const { body } = response;

      return [true, body];
    } catch (error) {
      if (error instanceof ResponseError) {
        const { type, index } = error.body.error;

        if (type === 'resource_already_exists_exception') {
          this.logger.log(`Using existing index: ${index}`);
        } else {
          this.logger.error(`Elasticsearch error: ${error.message}`);
        }
      } else {
        this.logger.error(`Create index error: ${error.message}`);
      }

      return [false, null];
    }
  }

  async search<T, R>(
    indexName: string,
    searchBody: T,
  ): Promise<[boolean, number, SearchResponse<R>]> {
    try {
      const request: RequestParams.Search<SearchRequest> = {
        index: indexName,
        body: searchBody,
      };

      const response = await this.elasticsearchService.search<
        SearchResponse<R>
      >(request);

      const { body } = response;
      const { hits } = body;
      const total =
        typeof hits.total === 'number' ? hits.total : hits.total.value;

      return [true, total, body];
    } catch (error) {
      this.logger.error(`Search document error: ${error.message}`);

      return [false, 0, null];
    }
  }

  async indexDocument<T>(
    indexName: string,
    documentBody: T,
  ): Promise<[boolean, IndexDocumentResponse]> {
    try {
      const request: RequestParams.Index<T> = {
        index: indexName,
        body: documentBody,
      };

      const response =
        await this.elasticsearchService.index<IndexDocumentResponse>(request);

      const { body } = response;

      return [true, body];
    } catch (error) {
      this.logger.error(`Index document error: ${error.message}`);

      return [false, null];
    }
  }
}
