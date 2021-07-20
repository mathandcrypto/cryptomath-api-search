import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  protoFile: process.env.APP_PROTO_FILE,
  protoUrl: process.env.APP_PROTO_URL,
  rmqUser: process.env.APP_RABBITMQ_USER,
  rmqPassword: process.env.APP_RABBITMQ_PASSWORD,
  rmqHost: process.env.APP_RABBITMQ_HOST,
  rmqQueueName: process.env.APP_RABBITMQ_QUEUE_NAME,
}));
