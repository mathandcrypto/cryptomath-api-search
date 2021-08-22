export interface ElasticsearchConfig {
  node: string;
  username: string;
  password: string;
  maxRetries: number;
  requestTimeout: number;
  pingTimeout: number;
}