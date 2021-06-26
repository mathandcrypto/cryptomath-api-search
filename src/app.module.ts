import { Module } from '@nestjs/common';
import { AppConfigModule } from '@config/app/config.module';
import { SearchModule } from '@search/search.module';

@Module({
  imports: [AppConfigModule, SearchModule],
})
export class AppModule {}
