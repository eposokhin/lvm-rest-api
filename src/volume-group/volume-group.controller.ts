import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { VolumeGroupService } from './volume-group.service';
import { CreateVolumeGroupDto } from './dto/create-volume-group.dto';

@Controller('vg')
export class VolumeGroupController {
  constructor(private readonly volumeGroupService: VolumeGroupService) {}
  
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createVolumeGroupDto: CreateVolumeGroupDto) {
    return this.volumeGroupService.create(createVolumeGroupDto);
  }

  @Get()
  findAll() {
    return this.volumeGroupService.findAll();
  }
}
