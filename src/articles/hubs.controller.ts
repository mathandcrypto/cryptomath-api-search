import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  InsertHubDocumentRequest,
  InsertDocumentResponse,
} from 'cryptomath-api-message-types';
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
}
