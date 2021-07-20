import { Module } from '@nestjs/common';
import { AppConfigModule } from '@config/app/config.module';
import { ArticlesModule } from '@articles/articles.module';
import { AppController } from './app.controller';

@Module({
  imports: [AppConfigModule, ArticlesModule],
  controllers: [AppController],
})
export class AppModule {}
