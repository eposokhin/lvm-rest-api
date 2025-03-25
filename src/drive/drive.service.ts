import { Injectable } from '@nestjs/common';
import { Drive } from './interfaces/drive.interface';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';

const execAsPromise = promisify(exec);

@Injectable()
export class DriveService {

  async findAll(): Promise<Drive[]> {
    const { stdout: connectedDrives } = await execAsPromise('lsblk --fs -J');

    const { stdout: rootDrive } = await execAsPromise('findmnt / -o SOURCE -n')

    const drives: Drive[] = JSON.parse(connectedDrives).blockdevices

    return drives
      .filter(device => !rootDrive.includes(device.name))
      .map(drive => ({ name: drive.name }))
  }
}
