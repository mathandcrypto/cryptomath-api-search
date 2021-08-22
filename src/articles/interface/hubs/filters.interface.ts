import {
  QueryDslTermQuery,
  QueryDslRangeQuery,
} from '@elastic/elasticsearch/api/types';
import { TermTypeQuery } from '@common/interfaces/elastic/query/term-type-query.interface';

export interface HubsFilters {
  articles_count:
    | TermTypeQuery<QueryDslTermQuery>
    | TermTypeQuery<QueryDslRangeQuery>;
  tags_count:
    | TermTypeQuery<QueryDslTermQuery>
    | TermTypeQuery<QueryDslRangeQuery>;
}
