import { Controller } from '@nestjs/common';
import {
  SearchArticlesServiceController,
  SearchArticlesServiceControllerMethods,
  SearchHubsRequest,
  SearchHubsResponse,
  SearchTagsRequest,
  SearchTagsResponse,
} from '@cryptomath/cryptomath-api-proto/types/search';
import { HubsService } from '@articles/hubs.service';
import { TagsService } from '@articles/tags.service';
import { ArticlesHubSerializerService } from './serializers/articles/hub.serializer';
import { ArticlesTagSerializerService } from './serializers/articles/tag.serializer';

@Controller()
@SearchArticlesServiceControllerMethods()
export class SearchArticlesController
  implements SearchArticlesServiceController
{
  constructor(
    private readonly hubsService: HubsService,
    private readonly tagsService: TagsService,
    private readonly hubSerializerService: ArticlesHubSerializerService,
    private readonly tagSerializerService: ArticlesTagSerializerService,
  ) {}

  async searchHubs({
    query,
    filters,
    sorts,
    offset,
    limit,
  }: SearchHubsRequest): Promise<SearchHubsResponse> {
    const [isHubsFound, took, skippedHubs, totalHubs, hubsHits] =
      await this.hubsService.search(query, filters, sorts, offset, limit);

    if (!isHubsFound) {
      return {
        isHubsFound: false,
        hubs: [],
        took,
        limit,
        total: 0,
      };
    }

    return {
      isHubsFound: true,
      took,
      hubs: await this.hubSerializerService.serializeCollection(hubsHits),
      limit: skippedHubs,
      total: totalHubs,
    };
  }

  async searchTags({
    query,
    filters,
    sorts,
    offset,
    limit,
  }: SearchTagsRequest): Promise<SearchTagsResponse> {
    const [isTagsFound, took, skippedTags, totalTags, tagsHits] =
      await this.tagsService.search(query, filters, sorts, offset, limit);

    if (!isTagsFound) {
      return {
        isTagsFound: false,
        tags: [],
        took,
        limit,
        total: 0,
      };
    }

    return {
      isTagsFound: true,
      took,
      tags: await this.tagSerializerService.serializeCollection(tagsHits),
      limit: skippedTags,
      total: totalTags,
    };
  }
}
