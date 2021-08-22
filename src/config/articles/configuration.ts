import { registerAs } from '@nestjs/config';
import { ArticlesConfig } from './interfaces/articles-config.interface';

export default registerAs<ArticlesConfig>('articles', () => ({
  protoFile: process.env.ARTICLES_SERVICE_PROTO_FILE,
  protoUrl: process.env.ARTICLES_SERVICE_PROTO_URL,
  articlesElasticsearchIndex: process.env.ARTICLES_ELASTICSEARCH_INDEX,
  hubsElasticsearchIndex: process.env.HUBS_ELASTICSEARCH_INDEX,
  articlesSearchResultsMaxLimit: Number(
    process.env.ARTICLES_SEARCH_RESULTS_MAX_LIMIT,
  ),
  hubsSearchResultsMaxLimit: Number(process.env.HUBS_SEARCH_RESULTS_MAX_LIMIT),
  tagsSearchResultsMaxLimit: Number(process.env.TAGS_SEARCH_RESULTS_MAX_LIMIT),
}));
