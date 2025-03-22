import { Injectable, Body, BadRequestException } from '@nestjs/common';
import { CreateLogicalVolumeDto } from './dto/create-logical-volume.dto';
import { LogicalVolume } from './interfaces/volume.interface';

import { exec } from 'child_process';
import { promisify } from 'util';
import { createHash } from 'crypto';
import { LogicalVolumeStorage } from './logical-volume.storage';
const execPromise = promisify(exec)


@Injectable()
export class LogicalVolumeService {
  constructor(private readonly logicalVolumeStorage: LogicalVolumeStorage) { }

  async create(@Body() createLogicalVolumeDto: CreateLogicalVolumeDto): Promise<void> {
    const { name: lvName, vg_id: vgId, size } = createLogicalVolumeDto
    try {
      const lvNameHash = createHash('md5').update(lvName).digest('hex');
      const vgIdHash = createHash('md5').update(vgId).digest('hex');

      this.logicalVolumeStorage.save(lvNameHash, { name: lvName, vg_id: vgId })
      const lvCreate = `lvcreate -L ${size / 1024 / 1024}M -n ${lvNameHash} ${vgIdHash}`
      await execPromise(lvCreate)
    } catch (error) {
      throw new BadRequestException(error.stderr.trim())
    }
  }

  async findAll(): Promise<LogicalVolume[]> {
    try {
      const { stdout } = await execPromise('lvs --reportformat json')
      const result = JSON.parse(stdout)

      const mappedData = result.report[0].lv.map(async v => {
        const result = await this.logicalVolumeStorage.findByHash(v.lv_name)
        return {
          name: result?.lv.name,
          vg_id: result?.lv.vg_id,
          size: parseInt(v.lv_size) * 1024 * 1024
        }
      })

      return Promise.all(mappedData)
    } catch (error) {
      throw new BadRequestException(error.stderr.trim())
    }
  }
}
