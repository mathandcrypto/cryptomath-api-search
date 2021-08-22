import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  InsertArticleDocumentRequest,
  InsertDocumentResponse,
} from '@cryptomath/cryptomath-api-message-types';
import { ArticlesService } from './articles.service';

@Controller()
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @MessagePattern('insert-article-document')
  async insertDocument(
    @Payload()
    {
      title,
      abstract,
      fullText,
      userId,
      hubs,
      tags,
      createdAt,
    }: InsertArticleDocumentRequest,
  ): Promise<InsertDocumentResponse> {
    const [isArticleDocumentCreated, articleDocumentId] =
      await this.articlesService.insertDocument(
        title,
        abstract,
        fullText,
        userId,
        hubs,
        tags,
        createdAt,
      );

    if (!isArticleDocumentCreated) {
      return { isDocumentCreated: false };
    }

    return {
      isDocumentCreated: true,
      documentId: articleDocumentId,
    };
  }
}
