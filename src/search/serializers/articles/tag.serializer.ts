import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { SearchHit as HitElastic } from '@elastic/elasticsearch/api/types';
import { TagSource } from '@articles/interface/tags/source.interface';
import { Hit as HitProto } from '@cryptomath/cryptomath-api-proto/types/search';

@Injectable()
export class ArticlesTagSerializerService extends BaseSerializerService<
  HitElastic<TagSource>,
  HitProto
> {
  async serialize(tag: HitElastic<TagSource>): Promise<HitProto> {
    return {
      index: tag._index,
      id: tag._id,
      score: tag._score,
      sourceId: tag._source.tag_id,
    };
  }
}
