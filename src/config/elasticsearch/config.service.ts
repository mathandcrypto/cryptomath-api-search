import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ElasticsearchConfigService {
  constructor(private configService: ConfigService) {}

  get node(): string {
    return this.configService.get<string>('elasticsearch.node');
  }

  get authUsername(): string {
    return this.configService.get<string>('elasticsearch.authUsername');
  }

  get authPassword(): string {
    return this.configService.get<string>('elasticsearch.authPassword');
  }

  get maxRetries(): number {
    return this.configService.get<number>('elasticsearch.maxRetries');
  }

  get requestTimeout(): number {
    return this.configService.get<number>('elasticsearch.requestTimeout');
  }

  get pingTimeout(): number {
    return this.configService.get<number>('elasticsearch.pingTimeout');
  }
}
