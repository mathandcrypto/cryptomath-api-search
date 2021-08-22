import { registerAs } from '@nestjs/config';
import { ElasticsearchConfig } from './interfaces/elasticsearch-config.interface';

export default registerAs<ElasticsearchConfig>('elasticsearch', () => ({
  node: process.env.ELASTICSEARCH_NODE,
  username: process.env.ELASTICSEARCH_USERNAME,
  password: process.env.ELASTICSEARCH_PASSWORD,
  maxRetries: Number(process.env.ELASTICSEARCH_MAX_RETRIES),
  requestTimeout: Number(process.env.ELASTICSEARCH_REQUEST_TIMEOUT),
  pingTimeout: Number(process.env.ELASTICSEARCH_PING_TIMEOUT),
}));
