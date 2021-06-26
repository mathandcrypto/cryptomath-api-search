import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  rmqUser: process.env.APP_RABBITMQ_USER,
  rmqPassword: process.env.APP_RABBITMQ_PASSWORD,
  rmqHost: process.env.APP_RABBITMQ_HOST,
  rmqQueueName: process.env.APP_RABBITMQ_QUEUE_NAME,
}));
