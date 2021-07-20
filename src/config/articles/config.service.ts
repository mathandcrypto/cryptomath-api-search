import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ArticlesConfigService {
  constructor(private configService: ConfigService) {}

  get articlesElasticsearchIndex(): string {
    return this.configService.get<string>(
      'articles.articlesElasticsearchIndex',
    );
  }

  get hubsElasticsearchIndex(): string {
    return this.configService.get<string>('articles.hubsElasticsearchIndex');
  }

  get tagsElasticsearchIndex(): string {
    return this.configService.get<string>('articles.tagsElasticsearchIndex');
  }

  get articlesSearchResultsMaxLimit(): number {
    return this.configService.get<number>(
      'articles.articlesSearchResultsMaxLimit',
    );
  }

  get hubsSearchResultsMaxLimit(): number {
    return this.configService.get<number>('articles.hubsSearchResultsMaxLimit');
  }

  get tagsSearchResultsMaxLimit(): number {
    return this.configService.get<number>(
      'articles.tagsSearchResultsMaxLimit:',
    );
  }
}
