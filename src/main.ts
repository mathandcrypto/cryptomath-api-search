import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from '@config/app/config.service';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfigService = app.get(AppConfigService);

  const { rmqUrl, rmqQueueName } = appConfigService;

  await app.connectMicroservice<MicroserviceOptions>({
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

  app.startAllMicroservices(() =>
    console.log(`Search microservice is listening on ${rmqUrl}`),
  );
}
bootstrap();
