import { SortOrder } from '@elastic/elasticsearch/api/types';

export interface HubsSorts {
  name?: SortOrder;
  articles_count?: SortOrder;
  tags_count?: SortOrder;
}
