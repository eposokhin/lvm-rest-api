import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { LogicalVolumeService } from './logical-volume.service';
import { CreateLogicalVolumeDto } from './dto/create-logical-volume.dto';

@Controller('volume')
export class VolumeController {
  constructor(private readonly volumeService: LogicalVolumeService) {}
  
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createLogicalVolumeDto: CreateLogicalVolumeDto) {
    return this.volumeService.create(createLogicalVolumeDto);
  }

  @Get()
  findAll() {
    return this.volumeService.findAll();
  }
}
