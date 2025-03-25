import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVolumeGroupDto } from './dto/create-volume-group.dto';
import { VolumeGroup } from './interfaces/volume-group.interface';
import { exec } from 'child_process';
import { promisify } from 'util';
import { createHash } from 'crypto';
import { VolumeGroupStorage } from './volume-group.storage';
const execPromise = promisify(exec)

@Injectable()
export class VolumeGroupService {
  constructor(private readonly volumeGroupStorage: VolumeGroupStorage) { }
  async create(createVolumeGroupDto: CreateVolumeGroupDto): Promise<void> {
    const vgName = createVolumeGroupDto.name
    const drives = createVolumeGroupDto.drives.map(drive => `/dev/${drive}`) as `/dev/${string}`[]

    try {
      const vgNameHash = createHash('md5').update(vgName).digest('hex');
      this.volumeGroupStorage.save(vgNameHash, vgName)

      await Promise.all(drives.map(drive => execPromise(`pvcreate ${drive}`)))
      const vgcreate = `vgcreate ${vgNameHash} ${drives.join(' ')}`
      await execPromise(vgcreate)
    } catch (error) {
      console.error(error)
      throw new BadRequestException(error.stderr.trim())
    }
  }

  async findAll(): Promise<VolumeGroup[]> {
    const { stdout } = await execPromise('vgs --reportformat json')
    const result = JSON.parse(stdout)
    const mappedData = result.report[0].vg.map(async vg_ => ({
      name: (await this.volumeGroupStorage.findByHash(vg_.vg_name))?.name
    }))

    return Promise.all(mappedData)
  }
}
