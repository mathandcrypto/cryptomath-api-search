import { Module } from '@nestjs/common';
import { ArticlesModule } from '@articles/articles.module';
import { SearchArticlesController } from './articles.controller';
import { ArticlesHubSerializerService } from './serializers/articles/hub.serializer';
import { ArticlesTagSerializerService } from './serializers/articles/tag.serializer';

@Module({
  imports: [ArticlesModule],
  controllers: [SearchArticlesController],
  providers: [ArticlesHubSerializerService, ArticlesTagSerializerService],
})
export class SearchModule {}
