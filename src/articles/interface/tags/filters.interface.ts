import { TermTypeQuery } from '@common/interfaces/elastic/query/term-type-query.interface';
import {
  QueryDslRangeQuery,
  QueryDslTermQuery,
} from '@elastic/elasticsearch/api/types';

export interface TagsFilters {
  articles_count:
    | TermTypeQuery<QueryDslTermQuery>
    | TermTypeQuery<QueryDslRangeQuery>;
}
