import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { SearchHit as HitElastic } from '@elastic/elasticsearch/api/types';
import { HubSource } from '@articles/interface/hubs/source.interface';
import { Hit as HitProto } from '@cryptomath/cryptomath-api-proto/types/search';

@Injectable()
export class ArticlesHubSerializerService extends BaseSerializerService<
  HitElastic<HubSource>,
  HitProto
> {
  async serialize(hub: HitElastic<HubSource>): Promise<HitProto> {
    return {
      index: hub._index,
      id: hub._id,
      score: hub._score,
      sourceId: hub._source.hub_id,
    };
  }
}
