import { Controller } from '@nestjs/common';
import {
  SearchServiceController,
  SearchServiceControllerMethods,
  SearchHubsRequest,
  SearchHubsResponse,
} from 'cryptomath-api-proto/types/search';

@Controller()
@SearchServiceControllerMethods()
export class AppController implements SearchServiceController {
  async searchHubs({
    query,
    filters,
    sorts,
    offset,
    limit,
  }: SearchHubsRequest): Promise<SearchHubsResponse> {
    return null;
  }
}
