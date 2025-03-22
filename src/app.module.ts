import { Module } from '@nestjs/common';
import { DriveModule } from './drive/drive.module';
import { VolumeGroupModule } from './volume-group/volume-group.module';
import { VolumeModule } from './logical-volume/logical-volume.module';

@Module({
  imports: [DriveModule, VolumeGroupModule, VolumeModule],
})
export class AppModule {}
