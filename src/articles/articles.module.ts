import { Module } from '@nestjs/common';
import { ArticlesConfigModule } from '@config/articles/config.module';
import { ElasticModule } from '@providers/elastic/elastic.module';
import { ArticlesService } from './articles.service';
import { HubsService } from './hubs.service';
import { TagsService } from './tags.service';
import { ArticlesController } from './articles.controller';
import { HubsController } from './hubs.controller';

@Module({
  imports: [ArticlesConfigModule, ElasticModule],
  providers: [ArticlesService, HubsService, TagsService],
  controllers: [ArticlesController, HubsController],
})
export class ArticlesModule {}
