import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  ARTICLES_PACKAGE_NAME,
  HUBS_SERVICE_NAME,
  HubsServiceClient,
  FindHubSearchIdResponse,
} from '@cryptomath/cryptomath-api-proto/types/articles';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HubsPackageService implements OnModuleInit {
  private readonly logger = new Logger(HubsPackageService.name);
  private client: HubsServiceClient;

  constructor(@Inject(ARTICLES_PACKAGE_NAME) private clientGrpc: ClientGrpc) {}

  onModuleInit() {
    this.client =
      this.clientGrpc.getService<HubsServiceClient>(HUBS_SERVICE_NAME);
  }

  async findHubSearchId(
    hubId: number,
  ): Promise<[boolean, FindHubSearchIdResponse]> {
    try {
      const observable = this.client.findHubSearchId({ hubId });
      const response = await firstValueFrom<FindHubSearchIdResponse>(
        observable,
      );

      return [true, response];
    } catch (error) {
      this.logger.error(error);

      return [false, null];
    }
  }
}
