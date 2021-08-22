import { SearchBaseRequestBody } from '../interfaces/elastic/search/base-request-body.interface';
import {
  QueryDslParentIdQuery,
  QueryDslQueryContainer,
  SearchSortCombinations,
} from '@elastic/elasticsearch/api/types';

const prepareFilterQuery = <T>(filters: T): QueryDslQueryContainer[] => {
  const filterQuery: QueryDslQueryContainer[] = [];

  for (const [field, filter] of Object.entries(filters)) {
    filterQuery.push({
      [filter.type]: {
        [field]: filter.query,
      },
    });
  }

  return filterQuery;
};

const prepareSortQuery = <T>(sorts: T): SearchSortCombinations[] => {
  const sortQuery: SearchSortCombinations[] = [];

  for (const [field, sortOrder] of Object.entries(sorts)) {
    sortQuery.push({
      [field]: sortOrder,
    });
  }

  return sortQuery;
};

export const prepareSearchRequestBody = <T, R>(
  query: string,
  multiMatchFields: string[],
  filters: T,
  sorts: R,
  offset: number,
  limit: number,
  relationType?: string,
  parentId?: QueryDslParentIdQuery,
): SearchBaseRequestBody => {
  const filterQuery = prepareFilterQuery<T>(filters);
  const sortQuery = prepareSortQuery<R>(sorts);
  const mustQuery = [
    {
      multi_match: {
        query,
        fields: multiMatchFields,
      },
    },
  ] as QueryDslQueryContainer[];

  if (parentId) {
    mustQuery.push({ parent_id: parentId as QueryDslParentIdQuery });
  }

  if (relationType) {
    filterQuery.push({
      term: {
        relation_type: relationType,
      },
    });
  }

  const dslQuery = {
    bool: {
      must: mustQuery.length > 1 ? mustQuery : mustQuery[0],
      ...(filterQuery.length && {
        filter: filterQuery.length > 1 ? filterQuery : filterQuery[0],
      }),
    },
  };

  return {
    query: dslQuery,
    sort: sortQuery,
    from: offset,
    size: limit,
  };
};
