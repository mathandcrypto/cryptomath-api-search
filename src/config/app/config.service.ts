import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get rmqUser(): string {
    return this.configService.get<string>('app.rmqUser');
  }

  get rmqPassword(): string {
    return this.configService.get<string>('app.rmqPassword');
  }

  get rmqHost(): string {
    return this.configService.get<string>('app.rmqHost');
  }

  get rmqQueueName(): string {
    return this.configService.get<string>('app.rmqQueueName');
  }

  get rmqUrl(): string {
    return `amqp://${this.rmqUser}:${this.rmqPassword}@${this.rmqHost}`;
  }
}
