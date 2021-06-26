import { registerAs } from '@nestjs/config';

export default registerAs('elasticsearch', () => ({
  node: process.env.ELASTICSEARCH_NODE,
  authUsername: process.env.ELASTICSEARCH_AUTH_USERNAME,
  authPassword: process.env.ELASTICSEARCH_AUTH_PASSWORD,
  maxRetries: process.env.ELASTICSEARCH_MAX_RETRIES,
  requestTimeout: process.env.ELASTICSEARCH_REQUEST_TIMEOUT,
  pingTimeout: process.env.ELASTICSEARCH_PING_TIMEOUT,
}));
