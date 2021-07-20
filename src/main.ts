import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppConfigService } from '@config/app/config.service';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SEARCH_PACKAGE_NAME } from 'cryptomath-api-proto/types/search';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  const appConfigService = app.get(AppConfigService);

  const { protoFile, protoUrl, rmqUrl, rmqQueueName } = appConfigService;

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: SEARCH_PACKAGE_NAME,
      protoPath: join(
        process.cwd(),
        'node_modules/cryptomath-api-proto/proto/',
        protoFile,
      ),
      url: protoUrl,
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rmqUrl],
      queue: rmqQueueName,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.init();

  app.startAllMicroservices(() => {
    logger.log(`Search gRPC microservice is listening on ${protoUrl}`);
    logger.log(`Search RabbitMQ microservice is listening on ${rmqUrl}`);
  });
}
bootstrap();
