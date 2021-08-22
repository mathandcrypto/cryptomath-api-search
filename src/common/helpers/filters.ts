import {
  QueryDslTermQuery,
  QueryDslRangeQuery,
} from '@elastic/elasticsearch/api/types';
import { TermTypeQuery } from '@common/interfaces/elastic/query/term-type-query.interface';

export const getRangeQueryObject = (
  equals?: number,
  min?: number,
  max?: number,
): TermTypeQuery<QueryDslTermQuery> | TermTypeQuery<QueryDslRangeQuery> => {
  if (equals) {
    return { type: 'term', query: { value: equals } };
  } else {
    return {
      type: 'range',
      query: {
        ...(min && { gte: min }),
        ...(max && { lte: max }),
      },
    };
  }
};
