import { SortDirection } from '@cryptomath/cryptomath-api-proto/types/sorts';
import { SearchSortOrder } from '@elastic/elasticsearch/api/types';

export const getSortOrder = (direction: SortDirection): SearchSortOrder => {
  return direction === SortDirection.ASC ? 'asc' : 'desc';
};
