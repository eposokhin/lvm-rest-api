import { Module } from '@nestjs/common';
import { VolumeGroupService } from './volume-group.service';
import { VolumeGroupController } from './volume-group.controller';
import { VolumeGroupStorage } from './volume-group.storage';

@Module({
  controllers: [VolumeGroupController],
  providers: [VolumeGroupService, VolumeGroupStorage],
})
export class VolumeGroupModule {}
