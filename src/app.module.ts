import { Module } from '@nestjs/common';
import { AppConfigModule } from '@config/app/config.module';
import { ArticlesModule } from '@articles/articles.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [AppConfigModule, ArticlesModule, SearchModule],
})
export class AppModule {}
