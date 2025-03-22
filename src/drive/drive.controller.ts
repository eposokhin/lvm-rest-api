import { Controller, Get } from '@nestjs/common';
import { DriveService } from './drive.service';

@Controller('drive')
export class DriveController {
  constructor(private readonly driveService: DriveService) {}

  @Get()
  findAll() {
    return this.driveService.findAll();
  }
}
