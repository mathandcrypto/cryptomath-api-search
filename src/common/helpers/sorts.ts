import { SortDirection } from 'cryptomath-api-proto/types/sorts';
import { SortOrder } from '@elastic/elasticsearch/api/types';

export const getSortOrder = (direction: SortDirection): SortOrder => {
  return direction === SortDirection.ASC ? 'asc' : 'desc';
};
