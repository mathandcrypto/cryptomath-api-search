import { SearchSortOrder } from '@elastic/elasticsearch/api/types';

export interface HubsSorts {
  name?: SearchSortOrder;
  articles_count?: SearchSortOrder;
  tags_count?: SearchSortOrder;
}
