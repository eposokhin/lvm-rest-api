import { Module } from '@nestjs/common';
import { LogicalVolumeService } from './logical-volume.service';
import { VolumeController } from './logical-volume.controller';
import { LogicalVolumeStorage } from './logical-volume.storage';

@Module({
  controllers: [VolumeController],
  providers: [LogicalVolumeService, LogicalVolumeStorage],
})
export class VolumeModule { }
