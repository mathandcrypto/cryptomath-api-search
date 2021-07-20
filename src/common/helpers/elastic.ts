import { SearchBaseRequestBody } from '../interfaces/elastic/search/base-request-body.interface';
import {
  QueryContainer,
  SortCombinations,
} from '@elastic/elasticsearch/api/types';

const prepareFilterQuery = <T>(filters: T): QueryContainer[] => {
  const filterQuery: QueryContainer[] = [];

  for (const [field, filter] of Object.entries(filters)) {
    filterQuery.push({
      [filter.type]: {
        [field]: filter.query,
      },
    });
  }

  return filterQuery;
};

const prepareSortQuery = <T>(sorts: T): SortCombinations[] => {
  const sortQuery: SortCombinations[] = [];

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
): SearchBaseRequestBody => {
  const filterQuery = prepareFilterQuery<T>(filters);
  const sortQuery = prepareSortQuery<R>(sorts);

  return {
    query: {
      bool: {
        filter: filterQuery,
      },
      multi_match: {
        query,
        fields: multiMatchFields,
      },
    },
    sort: sortQuery,
    from: offset,
    size: limit,
  };
};
