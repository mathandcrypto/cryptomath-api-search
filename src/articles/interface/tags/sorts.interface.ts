import { SearchSortOrder } from '@elastic/elasticsearch/api/types';

export interface TagsSorts {
  name?: SearchSortOrder;
  articles_count?: SearchSortOrder;
}
