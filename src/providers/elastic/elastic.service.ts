import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { RequestParams } from '@elastic/elasticsearch';
import { ResponseError } from '@elastic/elasticsearch/lib/errors';
import { CreateIndexResponse } from './interface/response/create-index.interface';
import { IndexDocumentResponse } from './interface/response/index-document.interface';
import { UpdateDocumentResponse } from './interface/response/update-document.interface';
import { IndexDocumentOptions } from './interface/request/index-document-options.interface';
import {
  SearchRequest,
  SearchResponse,
} from '@elastic/elasticsearch/api/types';

@Injectable()
export class ElasticService {
  private readonly logger = new Logger(ElasticService.name);

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async createIndex<T>(
    indexName: string,
    indexBody: T,
  ): Promise<[boolean, CreateIndexResponse]> {
    const request: RequestParams.IndicesCreate<T> = {
      index: indexName,
      body: indexBody,
    };

    try {
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
        this.logger.error(
          `Create index error. Index name: ${indexName}. Error message: ${error.message}`,
        );
      }

      return [false, null];
    }
  }

  async search<T, R>(
    indexName: string,
    searchBody: T,
  ): Promise<[boolean, number, SearchResponse<R>]> {
    const request: RequestParams.Search<SearchRequest> = {
      index: indexName,
      body: searchBody,
    };

    try {
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
    options?: IndexDocumentOptions,
  ): Promise<[boolean, IndexDocumentResponse]> {
    const request: RequestParams.Index<T> = {
      index: indexName,
      body: documentBody,
      ...options,
    };

    try {
      const response =
        await this.elasticsearchService.index<IndexDocumentResponse>(request);

      const { body } = response;

      return [true, body];
    } catch (error) {

      this.logger.error(
        `Index document error. Index name: ${indexName}. Error message: ${error}`,
      );

      return [false, null];
    }
  }

  async updateDocument<T>(
    indexName: string,
    documentId: string,
    updateBody: T,
  ): Promise<[boolean, UpdateDocumentResponse]> {
    const request: RequestParams.Update<T> = {
      id: documentId,
      index: indexName,
      body: updateBody,
    };

    try {
      const response =
        await this.elasticsearchService.update<UpdateDocumentResponse>(request);

      const { body } = response;

      return [true, body];
    } catch (error) {
      this.logger.error(
        `Update document error. Index name: ${indexName}. Document id: ${documentId}. Error message: ${error.message}`,
      );

      return [false, null];
    }
  }
}
