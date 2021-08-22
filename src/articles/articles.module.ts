import { Module } from '@nestjs/common';
import { ArticlesConfigModule } from '@config/articles/config.module';
import { ArticlesPackageModule } from '@providers/grpc/articles/articles-package.module';
import { ElasticModule } from '@providers/elastic/elastic.module';
import { ArticlesService } from './articles.service';
import { HubsService } from './hubs.service';
import { TagsService } from './tags.service';
import { ArticlesController } from './articles.controller';
import { HubsController } from './hubs.controller';
import { TagsController } from './tags.controller';

@Module({
  imports: [ArticlesConfigModule, ArticlesPackageModule, ElasticModule],
  providers: [ArticlesService, HubsService, TagsService],
  controllers: [ArticlesController, HubsController, TagsController],
  exports: [HubsService, TagsService],
})
export class ArticlesModule {}
