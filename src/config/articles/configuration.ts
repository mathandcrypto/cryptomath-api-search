import { registerAs } from '@nestjs/config';

export default registerAs('articles', () => ({
  articlesElasticsearchIndex: process.env.ARTICLES_ELASTICSEARCH_INDEX,
  hubsElasticsearchIndex: process.env.HUBS_ELASTICSEARCH_INDEX,
  tagsElasticsearchIndex: process.env.TAGS_ELASTICSEARCH_INDEX,
  articlesSearchResultsMaxLimit: process.env.ARTICLES_SEARCH_RESULTS_MAX_LIMIT,
  hubsSearchResultsMaxLimit: process.env.HUBS_SEARCH_RESULTS_MAX_LIMIT,
  tagsSearchResultsMaxLimit: process.env.TAGS_SEARCH_RESULTS_MAX_LIMIT,
}));
