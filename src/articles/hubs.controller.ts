import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  InsertHubDocumentRequest,
  InsertDocumentResponse,
  UpdateHubStatsRequest,
  UpdateDocumentResponse,
} from '@cryptomath/cryptomath-api-message-types';
import { HubsService } from './hubs.service';

@Controller()
export class HubsController {
  constructor(private readonly hubsService: HubsService) {}

  @MessagePattern('insert-hub-document')
  async insertDocument(
    @Payload() { id, name, description }: InsertHubDocumentRequest,
  ): Promise<InsertDocumentResponse> {
    const [isHubDocumentCreated, hubDocumentId] =
      await this.hubsService.insertDocument(id, name, description);

    if (!isHubDocumentCreated) {
      return { isDocumentCreated: false };
    }

    return {
      isDocumentCreated: true,
      documentId: hubDocumentId,
    };
  }

  @MessagePattern('update-hub-stats')
  async updateStats(
    @Payload() { documentId, articlesCount, tagsCount }: UpdateHubStatsRequest,
  ): Promise<UpdateDocumentResponse> {
    const [isHubDocumentUpdated, hubDocumentVersion] =
      await this.hubsService.updateDocument(documentId, {
        articles_count: articlesCount,
        tags_count: tagsCount,
      });

    if (!isHubDocumentUpdated) {
      return { isDocumentUpdated: false };
    }

    return {
      isDocumentUpdated: true,
      version: hubDocumentVersion,
    };
  }
}
