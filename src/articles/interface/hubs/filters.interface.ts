import { TermQuery, RangeQuery } from '@elastic/elasticsearch/api/types';
import { TermTypeQuery } from '@common/interfaces/elastic/query/term-type-query.interface';

export interface HubsFilters {
  articles_count: TermTypeQuery<TermQuery> | TermTypeQuery<RangeQuery>;
  tags_count: TermTypeQuery<TermQuery> | TermTypeQuery<RangeQuery>;
}
