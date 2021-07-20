import { TermQuery, RangeQuery } from '@elastic/elasticsearch/api/types';
import { TermTypeQuery } from '@common/interfaces/elastic/query/term-type-query.interface';

export const getRangeQueryObject = (
  equals: number | undefined,
  min: number | undefined,
  max: number | undefined,
): TermTypeQuery<TermQuery> | TermTypeQuery<RangeQuery> => {
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
