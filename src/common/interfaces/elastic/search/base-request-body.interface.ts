import {
  QueryDslQueryContainer,
  SearchSort,
} from '@elastic/elasticsearch/api/types';

export interface SearchBaseRequestBody {
  query?: QueryDslQueryContainer;
  sort?: SearchSort;
  from: number;
  size: number;
}
