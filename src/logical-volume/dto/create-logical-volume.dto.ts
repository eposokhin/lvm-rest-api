import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";
import { LogicalVolume } from "../entities/logical-volume.entity";

export class CreateLogicalVolumeDto {
    @IsString()
    @IsNotEmpty()
    @Matches(LogicalVolume.LogicalVolumeName)
    name: string;
    @IsString()
    @IsNotEmpty()
    @Matches(LogicalVolume.LogicalVolumeName)
    vg_id: string;
    @IsNumber()
    size: number;
}