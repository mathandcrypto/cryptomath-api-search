import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  InsertTagDocumentRequest,
  InsertDocumentResponse,
} from '@cryptomath/cryptomath-api-message-types';
import { TagsService } from './tags.service';

@Controller()
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @MessagePattern('insert-tag-document')
  async insertDocument(
    @Payload()
    { id, hubId, hubDocumentId, name, description }: InsertTagDocumentRequest,
  ): Promise<InsertDocumentResponse> {
    const [isTagDocumentCreated, tagDocumentId] =
      await this.tagsService.insertDocument(
        id,
        hubId,
        hubDocumentId,
        name,
        description,
      );

    if (!isTagDocumentCreated) {
      return { isDocumentCreated: false };
    }

    return {
      isDocumentCreated: true,
      documentId: tagDocumentId,
    };
  }
}
