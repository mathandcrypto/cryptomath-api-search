export type TermTypes = 'term' | 'range';

export interface TermTypeQuery<T> {
  type: TermTypes;
  query: T;
}
