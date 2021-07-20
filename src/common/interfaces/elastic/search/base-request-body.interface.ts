import { QueryContainer, Sort } from '@elastic/elasticsearch/api/types';

export interface SearchBaseRequestBody {
  query?: QueryContainer;
  sort?: Sort;
  from: number;
  size: number;
}
